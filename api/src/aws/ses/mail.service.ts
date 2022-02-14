import { SES, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { SendEmailResponse } from 'aws-sdk/clients/ses';
import { Injectable } from '@nestjs/common';

import { Params } from './interfaces';

const CHARSET: string = 'UTF-8';

@Injectable()
export class EMailService {
  constructor(private readonly ses: SES) {}
  
  async send(params: Params): Promise<PromiseResult<SendEmailResponse, AWSError>> {
    const to: string[] = Array.isArray(params.to) ? params.to : [ params.to ];
    const replyTo: string[] = params.replyTo
      ? Array.isArray(params.replyTo) ? params.replyTo : [ params.replyTo ]
      : [ params.from ];

    const sendMailRequets: SES.SendEmailRequest = {
      Source: params.from,
      Destination: {
        ToAddresses: to,
      },
      ReplyToAddresses: replyTo,
      Message: {
        Subject: {
          Charset: CHARSET,
          Data: params.subject,
        },
        Body: {
          Html: {
            Charset: CHARSET,
            Data: params.html,
          },
          Text: {
            Charset: CHARSET,
            Data: params.text,
          }
        }
      }
    };

    return this.ses.sendEmail(sendMailRequets).promise();
  }
}
