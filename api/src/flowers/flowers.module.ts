import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShelvesModule } from '../shelves/shelves.module';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';
import { Shelf, ShelfSchema } from '../shelves/schemas/shelf.schemas';
import { FileUploadService } from '../aws/s3/file-upload.service';
import { RemovedFlowers, RemovedFlowersSchema } from './schemas/removedFlowers.schemas';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Shelf.name, schema: ShelfSchema },
      { name: RemovedFlowers.name, schema: RemovedFlowersSchema },
    ]),
    ShelvesModule,
  ],
  controllers: [FlowersController],
  providers:[FlowersService, FileUploadService]
})
export class FlowersModule {}
