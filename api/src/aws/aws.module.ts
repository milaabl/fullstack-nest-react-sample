import { S3, SES } from 'aws-sdk';
import { Module, DynamicModule, Global, Provider } from '@nestjs/common';

import { PicturesService } from './s3/pictures.service';
import { EMailService } from './ses/mail.service';
import {
  AWSOptions,
  AsyncModuleOptions,
  AWS_MODULE_OPTIONS,
} from './interfaces';

const SES_API_VERSION = '2010-12-01';

@Global()
@Module({})
export class AwsModule {
  static forRootAsync(asyncModuleOptions: AsyncModuleOptions): DynamicModule {
    const s3Provider: Provider = {
      provide: PicturesService,
      useFactory(options: AWSOptions){
        const { accessKeyId, secretAccessKey, s3PicturesBucket } = options;

        return new PicturesService(new S3({
          region : 'us-east-1',
          accessKeyId,
          secretAccessKey
        }), s3PicturesBucket);
      },
      inject: [AWS_MODULE_OPTIONS]
    };

    const sesProvider: Provider = {
      provide: EMailService,
      useFactory(options: AWSOptions){
        const { accessKeyId, secretAccessKey, sesRegion } = options;

        return new EMailService(new SES({
          apiVersion: SES_API_VERSION,
          accessKeyId,
          secretAccessKey,
          region: sesRegion
        }));
      },
      inject: [AWS_MODULE_OPTIONS]
    };

    const optionsAsyncProvider: Provider = {
      provide: AWS_MODULE_OPTIONS,
      useFactory: asyncModuleOptions.useFactory,
      inject: asyncModuleOptions.inject || []
    };

    return {
      module: AwsModule,
      imports: asyncModuleOptions.imports || [],
      providers: [
        optionsAsyncProvider,
        s3Provider,
        sesProvider,
      ],
      exports: [
        s3Provider,
        sesProvider,
      ]
    };
  }
}
