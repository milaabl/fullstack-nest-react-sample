import { Module } from '@nestjs/common';
import { FileUploadService } from '../aws/s3/file-upload.service';

@Module({
  imports: [],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class UtilsModule {}

