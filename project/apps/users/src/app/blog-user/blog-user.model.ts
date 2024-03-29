import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@project/shared/shared-types';



@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements User {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  lastDateSend: Date;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
