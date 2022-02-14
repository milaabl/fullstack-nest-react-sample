import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { LogEntry } from './schemas/log-entry.schemas';
import { ActionType } from './enums/action-type.enum';


@Injectable()
export class LogEntryService {
  constructor(@InjectModel(LogEntry.name) private readonly logEntryModel: Model<LogEntry>) {}

  async createLogEntry ( user: User, shelfId: string, flowerId: string, actionType: ActionType ): Promise<LogEntry> {
    const newLogEntry = {
      userId: user.id,
      shelfId,
      flowerId,
      actionType,
      createdAt: new Date()
    };

    const createdLogEntry: LogEntry = new this.logEntryModel(newLogEntry);
    return createdLogEntry.save();
  }

}

