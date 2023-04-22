import { ArgumentMetadata, BadRequestException, Injectable,  PipeTransform } from '@nestjs/common';
import Joi from 'joi';


@Injectable()
export class PostValidationPipe implements PipeTransform {

  constructor(private schema: Joi.ObjectSchema) { }

  transform(value: Record<string, unknown>, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must used only with "body"')
    }

    const { error } = this.schema.validate(value, { allowUnknown: true });
    if (error) {
      throw new BadRequestException('Validation error', { cause: error, description: error.message });
    }
    return value;
  }
}
