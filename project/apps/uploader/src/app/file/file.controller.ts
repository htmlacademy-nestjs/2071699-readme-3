import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@project/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { AvatarsService } from '../avatars/avatars.service';
import { ImgPostService } from '../img-post/img-post.service';

@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly avatarsService: AvatarsService,
    private readonly imgPostService: ImgPostService,
  ) {}

  @Post('upload/avatar/:userId')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('userId', MongoidValidationPipe) userId: string) {
    const newFile = await this.fileService.saveFile(file, 'avatar', userId);
    await this.avatarsService.postAvatars(userId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/image/:postId')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImg(@UploadedFile() file: Express.Multer.File, @Param('postId') postId: string) {
    const newFile = await this.fileService.saveFile(file, 'image', postId);
    await this.imgPostService.postImgPost(postId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }


  @Get(':fileId')
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}

