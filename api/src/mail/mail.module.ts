import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailService } from './mail.service';
import { AwsModule } from '../aws/aws.module';

@Module({
    imports: [
      ConfigModule,      
      AwsModule,
    ],
    providers: [MailService]
})

@Module({})
export class MailModule {}
