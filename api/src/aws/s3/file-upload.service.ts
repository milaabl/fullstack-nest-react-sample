import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

const ERROR_WRONG_FORMAT = 'Only .png, .jpg and .jpeg format allowed!';

const s3 = new AWS.S3();
AWS.config.update({
  region : 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class FileUploadService {
  uploadSingleFile(request, response): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      const storage = this.getStorage();
      const uploader = multer({ storage }).single('file');

      uploader(request, response, (error) => {
        if (error) {
          return reject(error);
        }
        resolve(request.file && request.file.key);
      });
    });
  }

  private getStorage() {
    return multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      key: (request, file, cb) => {
        if (file && file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
          cb(null, uuidv4());
        } else {
          cb(null, false);
          return cb(new Error(ERROR_WRONG_FORMAT));
        }
      }
    })
  }
}
