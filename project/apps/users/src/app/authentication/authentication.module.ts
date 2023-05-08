import { Module } from '@nestjs/common';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { PostModule } from '../posts/posts.module';
import { UsersSubscriptionsModule } from '../users-subscriptions/users-subscriptions.module';
import { NotifyDateModule } from '../date-notify/date-notify.module';

@Module({
  imports: [
    BlogUserModule,
    NotifyDateModule,
    UsersSubscriptionsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule,
    PostModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthenticationModule {}
