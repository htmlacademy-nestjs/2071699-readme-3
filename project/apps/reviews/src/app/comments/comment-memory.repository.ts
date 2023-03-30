import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: {[key: string]: Comment} = {};

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async findById(id: string): Promise<Comment> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }
    return null;
  }

  public async findByPostId(postId: string): Promise<Comment[]> {
    const comments = Object.values(this.repository)
    .filter((postItem) => postItem.postId === postId);

    if (! comments) {
      return null;
    }
    return [...comments];
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
