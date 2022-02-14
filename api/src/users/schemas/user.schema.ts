import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string

  @Prop()
  lastName: string

  @Prop()
  email: string

  @Prop()
  facebookId: string

  @Prop()
  password: string
    
  @Prop()
  timeZone: string  

  @Prop()
  avatarPath: string

  @Prop()
  createdAt: Date

  @Prop()
  emailVerification: { token: string, createdAt: Date }
      
  @Prop()
  notificationTime: number
}

export const UserSchema: NativeSchema<User> = SchemaFactory.createForClass(User);
