import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { FileUploadService } from '../aws/s3/file-upload.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ProfileController],
  providers: [UsersService, FileUploadService],
  exports: [UsersService]
})
export class UsersModule {}
