import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PicturesService {
  constructor(
    private readonly s3: S3,
    private readonly bucketName: string
  ) {}

  upload(key: string, content: S3.Body): Promise<S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      this.s3.upload({
        Bucket: this.bucketName,
        Key: key,
        Body: content
      }, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }

  delete(key: string): Promise<S3.DeleteObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({
        Bucket: this.bucketName,
        Key: key
      }, (err: Error, data: S3.DeleteObjectOutput) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }
}
