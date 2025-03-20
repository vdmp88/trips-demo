import { format } from 'date-fns';

const formatDateForInput = (date: Date | string) =>
  format(date, 'eee, MMMM dd');

export default formatDateForInput;
