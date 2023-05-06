import { Body, Controller,  Delete,  Get,  Param,  Post,   Query,   UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CommentDto } from '@project/shared/shared-dto';
import { CommentQuery } from '@project/shared/shared-query';

@Controller('comment')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/create/:postId')
  public async create(@Param('postId') postId: number,@Body() dto: CommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/create/${postId}`, dto);
    return data;
  }


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('/delete/:postId')
  public async delete(@Param('postId') postId: number, @Body() userId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/delete/${postId}`, {data : userId});
    return data;
  }


  @Get(':postId')
  public async showList(@Param('postId') postId: number, @Query() query: CommentQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${postId}`, {params : query} );
    return data;
  }

}
