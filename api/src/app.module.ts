import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShelvesModule } from './shelves/shelves.module';
import { FlowersModule } from './flowers/flowers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks.service';
import { MailModule } from './mail/mail.module';
import { AwsModule } from './aws/aws.module';
import { UtilsModule } from './utils/utils-module';
import { LogHistoryModule } from './log-history/log-history.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AppStateSchema, AppState } from './config/schemas/app-state.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: AppState.name, schema: AppStateSchema }]),
    ScheduleModule.forRoot(),
    AwsModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        s3PicturesBucket: configService.get<string>('AWS_S3_PICTURES_BUCKET'),
        sesRegion: configService.get<string>('AWS_SES_REGION')
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    ShelvesModule,
    FlowersModule,
    MailModule,
    LogHistoryModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    UtilsModule,
    AppService,
    TasksService
  ],
})
export class AppModule {}
