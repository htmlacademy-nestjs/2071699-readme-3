import { Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { LikeMemoryRepository } from './like-memory.repository';
import { LikeDto } from './dto/like.dto';
import { LikeEntity } from './like.entity';


@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeMemoryRepository
  ) {}

  public async createLike(dto: LikeDto) {

    const newLike = {...dto};

    const postEntity = await new LikeEntity(newLike)

    return this.likeRepository
      .create(postEntity);
  }

  public async getPostId(postId: string) {
    const existLike = await this.likeRepository.findByPostId(postId);

    if (!existLike) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.likeRepository.findByPostId(postId);
  }

  public async delete(id: string) {
    return this.likeRepository.destroy(id);
  }


}
