import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto, LoginUserDto, PasswordDto } from '@project/shared/shared-dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { RequestWithTokenPayload, RequestWithUser } from '@project/shared/shared-types';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { PostService } from '../posts/posts.service';
import { UserInfoRdo } from './rdo/user-info.rdo';
import { UsersSubscriptionsService } from '../users-subscriptions/users-subscriptions.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
    private readonly postService: PostService,
    private readonly usersSubscriptionsService: UsersSubscriptionsService,
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, userName } = newUser;
    await this.notifyService.registerSubscriber({ email, userName })
    return fillObject(UserRdo, newUser);
  }
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const createData = await this.authService.getUserCreateData(id);
    const countPosts = await this.postService.getCountPosts(id)
    const countSubscriptions = await this.usersSubscriptionsService.getByUserSubscriptionId(id)
    const userInfo = {
      _id: id,
      createdAt: createData,
      countPosts: countPosts,
      countSubscriptions: countSubscriptions.length}
    return userInfo;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }


  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Password changed'
  })
  @Post('changepassword')
  public async changePassword(@Req() { user: payload }: RequestWithTokenPayload, @Body() dto: PasswordDto) {
    const {sub, email} = payload;
    const loginUser: LoginUserDto = {email: email, password: dto.currentPassword};
    await this.authService.verifyUser(loginUser);
    return this.authService.changePassword(sub, dto);

  }

}

