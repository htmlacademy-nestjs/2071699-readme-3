import { CRUDRepository } from '@project/util/util-types';
import { NotifyPosts } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewPostsEntity } from './new-posts.entity';
import { NewPostsModel } from './new-posts.model';

@Injectable()
export class NewPostsRepository implements CRUDRepository<NewPostsEntity, string, NotifyPosts> {
  constructor(
    @InjectModel(NewPostsModel.name) private readonly newPostsModel: Model<NewPostsModel>
  ) {}

  public async create(item: NewPostsEntity): Promise<NotifyPosts> {
    const newNewPosts = new this.newPostsModel(item);
    return newNewPosts.save();
  }

  public async destroy(id: string): Promise<void> {
    this.newPostsModel
      .deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<NotifyPosts | null> {
    return this.newPostsModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: NewPostsEntity): Promise<NotifyPosts> {
    return this.newPostsModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByUserId(userId: string, dateSend: string): Promise<NotifyPosts | null> {
    return this.newPostsModel
      .findOne({ userId, dateSend })
      .exec()
  }
}
