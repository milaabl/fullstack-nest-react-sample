import * as PushNotifications from '@pusher/push-notifications-server';

export interface WebNotification {
  title?: string,
  body?: string,
  icon?: string,
  deep_link?: string,
  hide_notification_if_site_has_focus?: boolean
}

export interface WebPayload {
  time_to_live?: number,
  notification?: WebNotification,
  data?: Record<string, any>
}

export interface PublishRequestWithWeb extends PushNotifications.PublishRequestBase {
  web: WebPayload
}

export type Notification = PushNotifications.PublishRequest | PublishRequestWithWeb;
