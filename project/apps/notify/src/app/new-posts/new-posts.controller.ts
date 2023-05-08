import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/shared-types';
import { MailService } from '../mail/mail.service';
import { NewPostsService } from './new-posts.service';
import { NotifyPostsDto } from './dto/notify-posts.dto';

@Controller()
export class NewPostsController {
  constructor(
    private readonly newPostsService: NewPostsService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddNotifyPosts,
    queue: 'readme.notify.posts',
  })
  public async create(dto: NotifyPostsDto) {
    this.newPostsService.addNotifyPosts(dto);
    const postsStr = dto.posts.map((el, index) => index.toString() +'. ' + el.postType + '\n' + el.title + '\n' + el.content + '\n' + el.addInfo).join('\n')
    this.mailService.sendNotifyNewPosts(dto.email, postsStr);
  }
}
