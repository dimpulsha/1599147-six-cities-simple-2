import {Request, Response} from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { JWT_ALGORITHM } from '../../app.config.js';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { UserDBServiceInterface } from './user-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO, createJWT } from '../../utils/common-utils.js';
import UserResponse from './response/user.response.js';
import LoggedUserResponse from './response/logged-user.response.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import HttpError from '../../common/errors/http.errors.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-object-id.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { UnPrivateRouteMiddleware } from '../../common/middlewares/unprivate-route.middleware.js';

@injectable()
export default class UserController extends Controller {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(RESTAppComponent.UserDBServiceInterface) private readonly userService: UserDBServiceInterface,
    @inject(RESTAppComponent.ConfigInterface) private readonly configService: ConfigInterface

  ) {
    super(logger, configService);

    this.logger.info('Register routes for UserController');
    this.addRoute({ path: '/create', method: HttpMethod.Post, handler: this.create, middlewares: [new UnPrivateRouteMiddleware, new ValidateDtoMiddleware(CreateUserDto)] });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.check });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.userLogin });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.avatarUpload,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.getItem('UPLOAD_DIRECTORY'), 'avatar'),
      ] });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise<void> {
    this.logger.debug(JSON.stringify(body));
    const existUser = await this.userService.findByMail(body.email);

    if (existUser) {
      throw new HttpError( StatusCodes.CONFLICT, `User with email «${body.email}» exists.`, 'UserController' );
    }

    const result = await this.userService.create(body, this.configService.getItem('SALT'));
    this.created(res, fillDTO(UserResponse, result));
  }

  public async check(req: Request, res: Response): Promise<void> {
    const user = await this.userService.findByMail(req.user.email);
    this.logger.debug(JSON.stringify(user));
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }
    this.ok(res, fillDTO(UserResponse, user));
  }

  public async userLogin({ body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, res: Response): Promise<void> {
    this.logger.debug(JSON.stringify(body));
    const user = await this.userService.verifyUser(body,this.configService.getItem('SALT'));

    if (!user) {
      throw new HttpError( StatusCodes.CONFLICT, `Incorrect email ${body.email} or password.`, 'UserController' );
    }

    const userToken = await createJWT(JWT_ALGORITHM, this.configService.getItem('JWT_SECRET'), { email: user.email, id: user.id });
    this.logger.debug(String(userToken));
    this.ok(res, fillDTO(LoggedUserResponse, { email: user.email, authToken: userToken }));
  }

  public async avatarUpload(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
    this.logger.info('new avatar uploaded');
  }

}
