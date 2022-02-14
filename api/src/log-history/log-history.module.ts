import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogEntryService } from './log-entry.service';
import { LogEntry, LogEntrySchema } from './schemas/log-entry.schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: LogEntry.name, schema: LogEntrySchema }]),
    ],
    providers: [LogEntryService],
})

export class LogHistoryModule {}
