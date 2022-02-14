import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

@Schema()
export class AppState extends Document {
  @Prop()
  wateringTask: { lastRunAt: Date }
}

export const AppStateSchema: NativeSchema<AppState> = SchemaFactory.createForClass(AppState);
