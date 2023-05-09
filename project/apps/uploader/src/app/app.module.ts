import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@project/config/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { AvatarsModule } from './avatars/avatars.module';
import { ImgPostModule } from './img-post/img-post.module';


@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    AvatarsModule,
    ImgPostModule
  ],
})
export class AppModule {}
