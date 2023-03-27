import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';
import { User, UserRole } from '@project/shared/shared-types';

export class BlogUserEntity implements User {
  public _id: string;
  public email: string;
  public userName: string;
  public avatar: string;
  public role: UserRole;
  public passwordHash: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.userName = blogUser.userName;
    this.avatar = blogUser.avatar;
    this.role = blogUser.role;
    this.passwordHash = blogUser.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
