import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { NotificationsService } from './notifications/notifications.service';
import { AppState } from './config/schemas/app-state.schema';
import { User } from './users/schemas/user.schema';
import { Shelf } from './shelves/schemas/shelf.schemas';
import { Notification } from './notifications/interfaces';

// We are going to select all the flowers with wateringTime = now + NOTIFICATION_TIME_AHEAD
const NOTIFICATION_TIME_AHEAD = 12; // hours

// Number of seconds that can pass before the notification is considered invalid and can be discarded
const NOTIFICATION_TIME_TO_LIVE = 3600 * 24; // 24h

interface AggregatedShelf {
  _id: string,
  location: string,
  ownerId: string,
  flowers: string[]
}

@Injectable()
export class TasksService {
  private readonly logger: Logger = new Logger('TasksService');

  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService,
    @InjectModel(Shelf.name) private readonly shelveModel: Model<Shelf>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async wateringNotification() {
    const notifiedAt: Date = new Date();
    const appState: AppState = await this.appService.getAppState();

    if(!appState.wateringTask){
      appState.wateringTask = { lastRunAt: notifiedAt };
    };
    
    const userIds: string[] = (await this.usersService.findToNotify(appState.wateringTask.lastRunAt, notifiedAt))
      .map(({ _id }: User) => _id.toString());
        
    const nextWateringMaxTime: Date = new Date();
    nextWateringMaxTime.setHours(nextWateringMaxTime.getHours() + NOTIFICATION_TIME_AHEAD);

    appState.wateringTask.lastRunAt = notifiedAt;
    appState.markModified('wateringTask');
    appState.save();

    const shelfsToNotify: AggregatedShelf[] = await this.shelveModel.aggregate([
      {
        $match: {
          ownerId: { $in: userIds }
        }
      },
      {
        $project: {
          flowers: 1,
          location: 1,
          ownerId: 1
        }
      },
      { $unwind: '$flowers' },
      {
        $match: {
          'flowers.nextWateringAt': {
            $lte: nextWateringMaxTime
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          location: { $first: '$location' },
          ownerId: { $first: '$ownerId' },
          flowers: { $push:'$flowers.name' }
        }
      }
    ]).exec();
    
    shelfsToNotify.forEach((shelf: AggregatedShelf) => {
      const notification = this.getNotificationForShelf(shelf);
      this.notificationsService.publishToUsers([shelf.ownerId], notification);
      this.logger.verbose(`${JSON.stringify(notification)} sent to ${shelf.ownerId}`); // just for debug
    });
  } 

  private getNotificationForShelf(shelf: AggregatedShelf): Notification {
    const title: string = `Time to water ${shelf.location} shelf!`;
    const body: string = `${shelf.flowers.join(', ')} need${(shelf.flowers.length == 1 ? 's' : '')} your care!`;

    return {
      web: {
        time_to_live: NOTIFICATION_TIME_TO_LIVE,
        notification: {
          title,
          body,
          deep_link: `${this.configService.get<string>('CLIENT_BASE_URL')}/shelf/${shelf._id}`
        }
      }
    };
  }
}
