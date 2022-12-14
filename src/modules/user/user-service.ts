import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { UserDBServiceInterface } from './user-service.interface.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { RESTAppComponent } from '../../types/component.types.js';

@injectable()
export default class UserDBService implements UserDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) private logger: LoggerInterface,
    @inject(RESTAppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity> ) { }

  public async create(userDTO: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(userDTO);
    user.setPassword(userDTO.password, salt);

    const createResult = await this.userModel.create(user);
    this.logger.info(`User ${user.email} created`);

    return createResult;

  }

  public async findByMail(email: string): Promise<DocumentType<UserEntity> | null>  {
    return this.userModel.findOne({email});
  }

  public async findByID(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec();
  }

  public async findOrCreate(userDTO: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const currentUser = await this.findByMail(userDTO.email);

    if (currentUser) {
      return currentUser;
    }

    return this.create(userDTO, salt);
  }

  public async verifyUser(userDTO: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByMail(userDTO.email);
    if (!user) { return null; }

    if (user.verifyPassword(userDTO.password, salt)) { return user; }

    return null;
  }

}
