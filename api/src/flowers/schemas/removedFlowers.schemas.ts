import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Flower } from 'src/flowers/interfaces';

@Schema()
export class RemovedFlowers extends Document {
  @Prop()
  ownerId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  flower: Flower;
}

export const RemovedFlowersSchema: NativeSchema<RemovedFlowers> = SchemaFactory.createForClass(RemovedFlowers);
