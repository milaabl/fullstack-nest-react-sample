import { FlowerCardData } from '../../../interfaces';

export function getWateringOverdueText(amountOfDays: number): string {
  const missedAmountOfDays = Math.abs(amountOfDays);
  return missedAmountOfDays === 1
    ? `${missedAmountOfDays} day`
    : `${missedAmountOfDays} days`;
}

export function checkIsMissedWatering(overdueDays: number): boolean {
  return overdueDays < 0 && overdueDays !== 0;
}

export function getDifference(wateringDate: Date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const day1 = new Date(wateringDate);
  const day2 = new Date();
  const utc1 = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
  const utc2 = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());
  const difference_ms = utc1 - utc2;
  return Math.round(difference_ms / oneDay);
}

export const checkIsWateringAvailableToday = (flower: FlowerCardData) => {
  const { nextWateringAt, name, wateringRule } = flower;
  const expectedNextWatering = new Date();
  expectedNextWatering.setDate(expectedNextWatering.getDate() + wateringRule);

  const nextWateringDate = new Date(nextWateringAt).getDate();
  const expectedNextWateringDate = expectedNextWatering.getDate();

  if (expectedNextWateringDate === nextWateringDate) {
    throw new Error(`The pot <u>${name}</u> has already been watered today.`);
  }
};
