import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Flower } from 'src/flowers/interfaces';

@Schema()
export class VirtualShelf extends Document {
  @Prop()
  ownerId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  picturePath: string;

  @Prop()
  flowers:  Flower[]
}

export const VirtualShelfSchema: NativeSchema<VirtualShelf> = SchemaFactory.createForClass(VirtualShelf);
