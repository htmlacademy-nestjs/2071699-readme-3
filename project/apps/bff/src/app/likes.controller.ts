import { Body, Controller,  Delete,  Param,  Post,   UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('like')
@UseFilters(AxiosExceptionFilter)
export class LikesController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/create/:id')
  public async create(@Param('id') id: number, @Body() userId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Likes}/create/${id}`, userId);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('/delete/:id')
  public async delete(@Param('id') id: number, @Body() userId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Likes}/delete/${id}`, {data : userId});
    return data;
  }

}
