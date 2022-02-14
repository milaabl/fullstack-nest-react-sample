import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as PushNotifications from '@pusher/push-notifications-server';

import { Notification } from './interfaces';

@Injectable()
export class NotificationsService {
  private readonly beamsClient: PushNotifications;

  constructor(private readonly configService: ConfigService) {
    this.beamsClient = new PushNotifications({
      instanceId: this.configService.get<string>('PUSHER_BEAMS_INSTANCE_ID'),
      secretKey: this.configService.get<string>('PUSHER_BEAMS_SECRET_KEY')
    });
  }

  getBeamsClient(): PushNotifications {
    return this.beamsClient;
  }

  async publishToUsers(userIds: string[], notification: Notification): Promise<PushNotifications.PublishResponse> {
    return this.getBeamsClient().publishToUsers(userIds, notification as any);
  }
}
