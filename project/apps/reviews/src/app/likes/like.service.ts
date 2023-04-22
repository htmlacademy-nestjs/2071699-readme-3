import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { LikeDto } from './dto/like.dto';
import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';


@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeRepository
  ) {}

  public async createLike(dto: LikeDto) {

    const existLike = await this.likeRepository.findByPostUser(dto.postId, dto.userId);
    if (existLike) {
     throw new ConflictException('Like is already installed')
    }
    const newLike = {...dto};

    const postEntity = await new LikeEntity(newLike)

    return this.likeRepository
      .create(postEntity);
  }

  public async getPostId(postId: number) {
    const existLike = await this.likeRepository.findByPostId(postId);

    if (!existLike) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.likeRepository.findByPostId(postId);
  }

  public async delete(postId: number) {
    return this.likeRepository.destroy(postId);
  }


}
