import { Controller,  Param,  Post,   Req,   UseFilters, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridPostInterceptor } from './interceptors/userid-post.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';


@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class UploaderController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async postAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/avatar/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/image/:id')
  @UseInterceptors(UseridPostInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  public async postImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {

    const formData = new FormData();
     formData.append('file', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/image/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }

}
