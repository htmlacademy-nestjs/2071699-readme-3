import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { POST_NOT_FOUND } from '@project/shared/shared-types';
import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';


@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeRepository
  ) {}

  public async createLike(postId: number, userId:string) {

    const isPostPublic = await this.likeRepository.getIsPostStatusPublic(postId);
    if (!isPostPublic) {
      throw new ConflictException('Post is not public')
     }
    const existLike = await this.likeRepository.findByPostUser(postId, userId);
    if (existLike) {
     throw new ConflictException('Like is already installed')
    }
    const newLike = {postId, userId};

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

  public async delete(postId: number, userId: string) {
    const like = await this.likeRepository.findByPostUser(postId, userId)
    if (!like) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return this.likeRepository.destroy(like.likeId);
  }


}
