import * as PusherPushNotification from '@pusher/push-notifications-web';
import instance from './httpClient';

const ENDPOINT_BEAMS_AUTH = '/pusher/beams-auth';

class TokenProvider implements PusherPushNotification.ITokenProvider {
  private url: string;

  private queryParams: {[key: string]: any;} | undefined;

  constructor({ url, queryParams }: PusherPushNotification.TokenProviderOptions) {
    this.url = url;
    this.queryParams = queryParams;
  }

  async fetchToken(userId: string) {
    const queryParams = { user_id: userId, ...this.queryParams };

    const encodedParams = Object.entries(queryParams)
      .map(kv => kv.map(encodeURIComponent).join('='))
      .join('&');

    return (await instance.get(`${this.url}?${encodedParams}`)).data;
  }
}

function getBeamsClient() {
  // eslint-disable-next-line
  return new (PusherPushNotification as any).Client({
    instanceId: process.env.REACT_APP_PUSHER_BEAMS_INSTANCE_ID,
  });
}

export async function initPushNotifications(userId: string | null) {
  const beamsClient = getBeamsClient();
  const beamsUserId = await beamsClient.getUserId();

  if (!userId || userId !== beamsUserId) {
    console.log('beamsClient.stop();');
    beamsClient.stop();
  }

  if (userId && userId !== beamsUserId) {
    const beamsTokenProvider = new TokenProvider({
      url: ENDPOINT_BEAMS_AUTH,
    });

    beamsClient
      .start()
      .then(() => beamsClient.setUserId(userId, beamsTokenProvider))
      .catch(console.error);
  }
}
