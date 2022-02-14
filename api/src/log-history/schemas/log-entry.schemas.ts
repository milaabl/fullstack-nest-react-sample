import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { ActionType } from '../enums/action-type.enum'

@Schema()
export class LogEntry extends Document {
  @Prop()
  userId: string;

  @Prop()
  shelfId: string;

  @Prop()
  flowerId: string;

  @Prop()
  actionType : ActionType

  @Prop()
  createdAt: Date;
}

export const LogEntrySchema: NativeSchema<LogEntry> = SchemaFactory.createForClass(LogEntry);

