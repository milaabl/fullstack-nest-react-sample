import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as NativeSchema } from 'mongoose';
import { Flower } from '../../flowers/interfaces';
import { VirtualShelf } from './virtual-shelf.schemas';

@Schema()
export class Shelf extends VirtualShelf {
  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  users: [];

  @Prop()
  flowers: Flower[];

  @Prop()
  virtual: boolean;
}

export const ShelfSchema: NativeSchema<Shelf> = SchemaFactory.createForClass(Shelf);
