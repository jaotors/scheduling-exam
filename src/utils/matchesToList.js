import moment from 'moment';
import _ from 'lodash/fp';

const matchesToList = (matches) => {
  const datesForMatches = matches.reduce((acc, val) => {
    const start = moment(val.start);
    const end = moment(val.end);
    const diffDays = end.diff(start, 'days');
    let arrayDates = [];

    if (diffDays > 1) {
      for (let i = 0; i < diffDays; i++) {
        const date = moment(start).add(i, 'days').format('YYYY-MM-DD');
        arrayDates.push(date);
      }
      return acc.concat(arrayDates);
    } else {
      return acc.concat(val.start);
    }
  }, []);
  const uniqDatesForMatches = _.uniq(datesForMatches);

  const transformMatches = uniqDatesForMatches.map((d) => {
    const date = moment(d);
    return {
      date: d,
      meta: matches.reduce((acc, val) => {
        if (
          moment(date).diff(moment(val.start), 'days') >= 0 &&
          moment(date).diff(moment(val.end), 'days') < 0
        ) {
          return acc.concat({
            title: val.title,
            username: val.meta.username,
            allDay: val.allDay,
          });
        }

        return acc;
      }, []),
    };
  });

  return transformMatches;
};

export default matchesToList;
