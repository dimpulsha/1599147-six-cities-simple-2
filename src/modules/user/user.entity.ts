import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../utils/common-utils.js';
import { UserName } from '../../app.config.js';
import { DEFAULT_AVATAR } from '../../app.config.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor(data: User) {
    super();
    this.userName = data.userName;
    this.email = data.email;
    if (data.avatarImg) { this.avatarImg = data.avatarImg; }
    this.isProUser = data.isProUser;
  }

  @prop({required: true, minlength: UserName.Min, maxlength: UserName.Max, trim: true})
  public userName!: string;

  @prop({unique: true, trim: true, required: true})
  public email!: string;

  @prop({default: DEFAULT_AVATAR, trim: true})
  public avatarImg!: string;

  @prop({required: true, default: ''})
  public password!: string;

  @prop({required: true, default: false})
  public isProUser!: boolean;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
