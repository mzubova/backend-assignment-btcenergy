import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

/**
 * Get dates for the specified last number of days (in UTC)
 * @param lastNumberOfDays - lastNumberOfDays
 * @returns {Date[]} - dates
 */
export const getDatesForLastNumberOfDays = (lastNumberOfDays: number): Date[] => {
    const dates = [];
    for (let day = 0; day < lastNumberOfDays; day++) {
        const date = dayjs.utc().endOf('day').subtract(day, 'day').toDate();
        dates.push(date);
    }
    return dates;
}

/**
 * getDateFormatted
 * @param date - Date
 * @param format - Date format, defaults to 'DD.MM.YYYY'
 * @returns {string} Date string in specified format
 */
export const getDateFormatted = (date?: Date, format: string = 'DD.MM.YYYY') => {
    return dayjs(date).format(format);
}


