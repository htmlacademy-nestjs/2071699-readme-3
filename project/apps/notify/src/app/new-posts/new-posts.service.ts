import { Injectable } from '@nestjs/common';
import { NotifyPostsDto } from './dto/notify-posts.dto';
import { NewPostsRepository } from './new-posts.repository';
import { NewPostsEntity } from './new-posts.entity';

@Injectable()
export class NewPostsService {
  constructor(
    private readonly newPostsRepository: NewPostsRepository
  ) {}

  public async addNotifyPosts(dto: NotifyPostsDto) {

    const { userId, dateSend } = dto;
    const existsNotify = await this.newPostsRepository.findByUserId(userId, dateSend);

    if (existsNotify) {
      return existsNotify;
    }

    return this.newPostsRepository
      .create(new NewPostsEntity(dto));
  }
}
