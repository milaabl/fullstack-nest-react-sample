export const AWS_MODULE_OPTIONS: string = 'aws_module_options';

export interface AsyncModuleOptions {
  imports: any[],
  useFactory: any,
  inject: any[]
}

export type AWSOptions = {
  accessKeyId: string,
  secretAccessKey: string,
  s3PicturesBucket: string,
  sesRegion: string,
}
