import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

@Schema()
export class ChangePasswordRequest extends Document {
    @Prop()
    uId: string

    @Prop()
    token: string

    @Prop()
    createdAt: Date
}

export const ChangePasswordRequestSchema: NativeSchema<ChangePasswordRequest> = SchemaFactory.createForClass(ChangePasswordRequest);