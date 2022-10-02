import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto';
import { UserEntity } from './user.entity';

export interface UserDBServiceInterface {
  create(userDTO: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByMail(email: string): Promise<DocumentType<UserEntity> | null>;
  findByID(id: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(userDTO: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
