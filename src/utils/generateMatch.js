import moment from 'moment';
import faker from 'faker';

const randomNumber = (startTime, endTime) =>
  Math.floor(Math.random() * (endTime - startTime) + startTime);

const generateMatchDates = (
  matches = 10,
  start = moment(),
  end = moment().add(30, 'days')
) => {
  const endTime = +moment(end);
  const startTime = +moment(start);
  let arrayDates = [];

  while (arrayDates.length < matches) {
    let rndNum = randomNumber(startTime, endTime);
    let date = moment(rndNum).format('YYYY-MM-DD');
    let includeDate = arrayDates.includes(date);

    while (includeDate) {
      rndNum = randomNumber(startTime, endTime);
      date = moment(rndNum).format('YYYY-MM-DD');
      includeDate = arrayDates.includes(date);
    }

    arrayDates.push(date);
  }

  const listMatches = arrayDates.map((date) => {
    const username = faker.internet.userName();
    return {
      id: `${+moment()}${username}`,
      title: `Match with`,
      start: date,
      end: date,
      meta: {
        username,
        start: date,
        end: date,
      },
    };
  });

  return listMatches;
};

export default generateMatchDates;
