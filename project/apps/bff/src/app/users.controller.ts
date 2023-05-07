import { Body, Controller, Delete, Get, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto, LoginUserDto, PasswordDto, UserSubscriptionDto } from '@project/shared/shared-dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}
  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, createUserDto);
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`,  {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Post('changepassword')
public async changePassword(@Req() req: Request, @Body() dto: PasswordDto) {
  const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/changepassword`, dto, {
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Post('subscription/create')
public async createSubscription( @Body() dto: UserSubscriptionDto) {

  const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Subscription}/create`, dto);
  return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Delete('subscription/delete')
public async deleteSubscription( @Body() dto: UserSubscriptionDto) {

  const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Subscription}/delete`, {data : dto});
  return data;
}

}
