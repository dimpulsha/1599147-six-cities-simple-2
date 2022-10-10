import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common-utils.js';
import { UserDBServiceInterface } from './user-service.interface.js';
import UserResponse from './response/user.response.js';

@injectable()
export default class UserController extends Controller {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(RESTAppComponent.UserDBServiceInterface) private readonly userService: UserDBServiceInterface

  ) {
    super(logger);
    this.logger.info('Register routes for UserController');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.check });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.userLogin });


  }

  public async create(_req: Request, _res: Response): Promise<void> {
    const createResponse = ' user.user.create Response';
    this.logger.info('call user.create method');
    this.send(_res, StatusCodes.OK, createResponse);
  }

  public async check(_req: Request, _res: Response): Promise<void> {
    const checkResponse = ' user.user.check Response';
    this.logger.info('call user.check method');
    this.send(_res, StatusCodes.OK, checkResponse);
  }

  public async userLogin(_req: Request, _res: Response): Promise<void> {
    const loginResponse = ' user.userLogin Response';
    this.logger.info('call user.userLogin method');
    this.send(_res, StatusCodes.OK, loginResponse);
  }


}

