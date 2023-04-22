import { CRUDRepository } from '@project/util/util-types';
import { Like } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeMemoryRepository implements CRUDRepository<LikeEntity, string, Like> {
  private repository: {[key: string]: Like} = {};

  public async create(item: LikeEntity): Promise<Like> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async findById(id: string): Promise<Like> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }
    return null;
  }

  public async findByPostId(postId: number): Promise<Like[]> {
    const likes = Object.values(this.repository)
    .filter((postItem) => postItem.postId === postId);

    if (! likes) {
      return null;
    }
    return [...likes];
  }

  public async update(id: string, item: LikeEntity): Promise<Like> {
    this.repository[id] = {...item.toObject(), likeId: Number(id)};
    return this.findById(id);
  }
}
