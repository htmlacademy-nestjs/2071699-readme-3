import { HttpService } from '@nestjs/axios';
import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class UseridPostInterceptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/${request.params.id}`);
    if (request.user.sub !== data.userId) {
      throw new ConflictException('Пользователи могут редактировать и удалять только свои публикации')
    }
    return next.handle();
  }
}
