import { Body, Controller, Delete, Get, Param, Patch, Post,   UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { PostValidationPipe } from '@project/shared/shared-pipes';
import { contentEditValidationSchema, contentValidationSchema } from '@project/shared/shared-joi';
import { CreatePostDto, EditPostDto } from '@project/shared/shared-dto';
import { UseridPostInterceptor } from './interceptors/userid-post.interceptor';

@Controller('post')
@UseFilters(AxiosExceptionFilter)
export class PostController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/create')
  @UsePipes(new PostValidationPipe(contentValidationSchema))
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Post}/create`, dto);
    return data;
  }

  @Get('/:id')
  public async showPostId(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('delete/:id')
  @UseInterceptors(UseridPostInterceptor)
  public async delete(@Param('id') id: number) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Post}/delete/${id}`);
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Patch('edit/:id')
  @UseInterceptors(UseridPostInterceptor)
  @UsePipes(new PostValidationPipe(contentEditValidationSchema))
  public async edit(@Param('id') id: number, @Body() dto: EditPostDto) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Post}/edit/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('repost/:id')
  public async repost(@Param('id') id: number, @Body() newUserId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Post}/repost/${id}`, newUserId );
    return data;
  }
}
