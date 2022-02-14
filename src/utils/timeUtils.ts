const MINUTES_IN_HOUR = 60;

export const convertFromMinutesTo24Format = (notificationTime: number): string => {
  const hours = Math.floor(notificationTime / MINUTES_IN_HOUR);
  const minutes = notificationTime % MINUTES_IN_HOUR;
  const minutesConverted = minutes < 10 ? `0${minutes}` : minutes;
  const hoursConverted = hours < 10 ? `0${hours}` : hours;
  return `${hoursConverted}:${minutesConverted}`;
};

export const convertToMinutes = (notificationTime: string): number => {
  const [h, m] = notificationTime.split(':');
  const hours = Number(h) === 0 ? 0 : Number(h);
  const minutes = Number(m) === 0 ? 0 : Number(m);
  return hours * MINUTES_IN_HOUR + minutes;
};

export const convertTime24toNumberOfMinutesAM = (notificationTime: string): number => {
  const [h, m] = notificationTime.split(':');
  const hours = Number(h);
  const minutes = Number(m);

  return hours * 60 + minutes;
};

export const secondsToPeriodString = (seconds: number): string => {
  const DAY = 86400; // seconds
  const HOUR = 3600;
  const MINUTE = 60;
  let value = Math.abs(Math.floor(seconds));
  const days = Math.floor(value / DAY);
  value -= days * DAY;

  const hours = Math.floor(value / HOUR);
  value -= hours * HOUR;

  const minutes = Math.floor(value / MINUTE);

  return `${days > 0 ? `${days}d` : ''} ${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}h`;
};
