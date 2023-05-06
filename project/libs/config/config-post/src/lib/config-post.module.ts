import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rabbitConfig from './config/rabbit.config';

const ENV_POSTS_FILE_PATH = 'apps/posts/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_POSTS_FILE_PATH
    }),
  ]
})
export class ConfigPostModule {}
