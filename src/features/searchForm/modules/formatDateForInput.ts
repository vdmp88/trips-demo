import { format } from 'date-fns';

const formatDateForInput = (date: Date | string) =>
  format(date, 'eee, MMMM dd');

const formatDateForInputShort = (date: Date | string) => format(date, 'dd MMM');

export { formatDateForInput, formatDateForInputShort };
