
import { getDateFormatted, getDatesForLastNumberOfDays } from '../src/utils/dateHelper';

describe('Utils', () => {
  test('Date helper - gets formatted date ', async () => {
    const date = new Date('2011-04-11T10:20:30Z');
    const result = getDateFormatted(date);
    expect(result).toBe('11.04.2011');
  });
  test('Date helper - gets dates for last ammount of days ', async () => {
    const date = new Date('2011-04-11T10:20:30Z');
    const result = getDatesForLastNumberOfDays(2);
    expect(result[0] instanceof Date).toBe(true);
  });
})
