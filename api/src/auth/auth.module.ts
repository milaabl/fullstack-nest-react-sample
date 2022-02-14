import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { ChangePasswordRequestSchema, ChangePasswordRequest } from './schemas/change-password-request.schema';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { GoogleController } from './google/google.controller';
import { FacebookController } from './facebook/facebook.controller';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { jwtConstants } from './constants';
import { JWT_EXPIRES } from './auth.constants';

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: JWT_EXPIRES },
      }),
      UsersModule,
      ConfigModule,
      MailModule,
      MongooseModule.forFeature([{ name: ChangePasswordRequest.name, schema: ChangePasswordRequestSchema }])
    ],
    controllers: [FacebookController, AuthController, GoogleController],
    providers: [
        AuthService,
        JwtStrategy,
        MailService,
        GoogleStrategy,
        FacebookStrategy
    ]
})
export class AuthModule {}
