import { IsIn, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_COUNT_LIMIT } from './post-query.constants';
import {  PostState, PostType } from '@project/shared/shared-types';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsOptional()
  public user?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc';

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortLikes?: 'desc' | 'asc' ;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortComments?: 'desc' | 'asc';

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsEnum(PostType)
  @IsOptional()
  public postType?: PostType;

  @IsEnum(PostState)
  @IsOptional()
  public postState?: PostState;

  @IsOptional()
  public tag?: string;
}
