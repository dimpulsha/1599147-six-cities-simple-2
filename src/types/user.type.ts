import { UserType } from './user-type.enum';
export type User = {
  userName: string;
  email: string;
  avatarImg?: string;
  password: string;
  userType: UserType;
}
