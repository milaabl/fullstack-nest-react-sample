export interface Params {
  from: string;
  to: string | string[];
  replyTo?: string | string[];
  subject: string;
  html: string;
  text: string;
}
