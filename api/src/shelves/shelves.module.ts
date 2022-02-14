import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';
import { Shelf, ShelfSchema } from './schemas/shelf.schemas';
import { VirtualShelf, VirtualShelfSchema } from './schemas/virtual-shelf.schemas';
import { FileUploadService } from '../aws/s3/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shelf.name, schema: ShelfSchema },
      { name: VirtualShelf.name, schema: VirtualShelfSchema },
    ])
  ],
  exports: [
    MongooseModule,
    ShelvesService,
  ],
  controllers: [ShelvesController],
  providers: [ShelvesService, FileUploadService],
})
export class ShelvesModule {}
