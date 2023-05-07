import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { UserSubscriptionDto } from '@project/shared/shared-dto';
import { AUTH_SUBSCRIPT_EXISTS, AUTH_SUBSCRIPT_NOT_FOUND } from './users-subscriptions.constant';
import { UsersSubscriptionsEntity } from './users-subscriptions.entity';


@Injectable()
export class UsersSubscriptionsService {
  constructor(
    private readonly usersSubscriptionsRepository: UsersSubscriptionsRepository,
  ) {}

  public async create(dto: UserSubscriptionDto) {
    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.userSubscriptionId);

    if (existSubscription) {
      throw new ConflictException(AUTH_SUBSCRIPT_EXISTS);
    }

    const userEntity = await new UsersSubscriptionsEntity(dto)

    return this.usersSubscriptionsRepository
      .create(userEntity);
  }

  public async delete(dto: UserSubscriptionDto) {
    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.userSubscriptionId);

    if (!existSubscription) {
      throw new NotFoundException(AUTH_SUBSCRIPT_NOT_FOUND);
    }

    this.usersSubscriptionsRepository
      .delete(dto.userId, dto.userSubscriptionId);
  }

  public async getByUserId(userId: string) {
    return this.usersSubscriptionsRepository
      .findByUserId(userId);
  }

  public async getByUserSubscriptionId(userSubscriptionId: string) {
    return this.usersSubscriptionsRepository
      .findByUserSubscriptionId(userSubscriptionId);
  }
}
