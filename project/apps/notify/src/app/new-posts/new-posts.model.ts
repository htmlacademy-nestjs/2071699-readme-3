import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostForSend, NotifyPosts } from '@project/shared/shared-types';

@Schema({
  collection: 'new_posts',
  timestamps: true,
})
export class NewPostsModel extends Document implements  NotifyPosts {
  @Prop()
  public userId: string;

  @Prop()
  public email: string;

  @Prop()
  public posts: PostForSend[];


  @Prop()
  public dateSend: string;

}

export const NewPostsSchema = SchemaFactory.createForClass(NewPostsModel);
