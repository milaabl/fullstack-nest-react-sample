import { IsString, IsDate } from 'class-validator';
import * as mongoose from 'mongoose';

export class ChangePasswordRequestDto {
  @IsString()
  uId: mongoose.Types.ObjectId;

  @IsString()
  token: string;

  @IsDate()
  createdAt: Date;
}