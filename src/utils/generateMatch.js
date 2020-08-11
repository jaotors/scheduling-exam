import moment from 'moment';
import faker from 'faker';

const randomNumber = (startTime, endTime) =>
  Math.floor(Math.random() * (endTime - startTime) + startTime);

const generateMatchDates = (
  matches = 14,
  start = moment(),
  end = moment().add(30, 'days')
) => {
  const endTime = +moment(end);
  const startTime = +moment(start);
  let arrayDates = [];

  while (arrayDates.length < matches) {
    let rndNum = randomNumber(startTime, endTime);
    let date = moment(rndNum).format('YYYY-MM-DD');

    arrayDates.push(date);
  }

  const listMatches = arrayDates.map((date, key) => {
    const username = faker.internet.userName();
    return {
      id: `${+moment()}${key}${username}`,
      title: `Match with`,
      start: date,
      end: moment(date).add(1, 'days').format('YYYY-MM-DD'),
      allDay: true,
      meta: {
        username,
      },
    };
  });

  return listMatches;
};

export default generateMatchDates;
