import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto, LoginUserDto, PasswordDto } from '@project/shared/shared-dto';
import { UserRole, User } from '@project/shared/shared-types';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { JwtService  } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';
import { NotifyDateRepository } from '../date-notify/date-notify.repository';
import { NotifyDateEntity } from '../date-notify/date-notify.entity';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly notifyDateRepository: NotifyDateRepository,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, userName, password} = dto;

    const blogUser = {
      email, userName, role: UserRole.User,
      avatar: '', passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    return this.blogUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async getUserCreateData(id: string) {
    return this.blogUserRepository.findCreateDataById(id);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  public async changePassword(userId, dto: PasswordDto) {
    const {newPassword} = dto;
    const blogUser = await this.blogUserRepository.findById(userId);
    const userEntity = await new BlogUserEntity(blogUser).setPassword(newPassword)
    return this.blogUserRepository.update(userId, userEntity);
  }

  public async changeAvatar(userId: string, fileId: string) {

    const existUser = await this.blogUserRepository.findById(userId);
    if (!existUser)   {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return this.blogUserRepository.updateAvatar(userId, fileId);
  }


  public async createOrUpdateNotify(userId: string, dateNotify: Date) {
    const notifyEntity = await new NotifyDateEntity({userId, dateNotify})
    return this.notifyDateRepository.createOrUpdate(notifyEntity);
  }

  public async findNotifyByUser(userId: string) {
    return this.notifyDateRepository.findByUserId(userId);
  }
}
