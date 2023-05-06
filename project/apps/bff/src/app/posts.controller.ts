import { Body, Controller, Get,  Param,  Query,  UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { PostQuery } from '@project/shared/shared-query';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostsController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Get('')
  public async showList(@Query() query: PostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}`, {params : query} );
    return data;
  }


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('/draft')
  public async showListDraft(@Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/draft`,  {data : body});
    return data;
  }

  @Get('title/:title')
  public async showPostTitle(@Param('title') title: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/title/${title}`);
    return data;
  }
}
