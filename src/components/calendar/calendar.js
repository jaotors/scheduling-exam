import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import { CalendarBox } from './components';

let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const INITIAL_EVENTS = [
  {
    id: 0,
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: 1,
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
];

const Calendar = () => {
  return (
    <CalendarBox>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        initialEvents={INITIAL_EVENTS}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listDay',
        }}
      />
    </CalendarBox>
  );
};

export default Calendar;
