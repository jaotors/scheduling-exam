import moment from 'moment';

export const momentDateFormatter = (date, str = 'YYYY-MM-DD') =>
  moment(date).format(str);
