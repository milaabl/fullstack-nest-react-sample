import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PusherController } from './pusher/pusher.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [ConfigModule],
  exports: [NotificationsService],
  controllers: [PusherController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
