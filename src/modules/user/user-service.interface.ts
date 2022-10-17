import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import { UserEntity } from './user.entity.js';

export interface UserDBServiceInterface {
  create(userDTO: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByMail(email: string): Promise<DocumentType<UserEntity> | null>;
  findByID(id: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(userDTO: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  verifyUser(userDTO: LoginUserDto, salt: string):Promise<DocumentType<UserEntity> | null>;
}
