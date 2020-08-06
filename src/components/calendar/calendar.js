import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import INITIAL_EVENTS from '../../fixtures/events.json';

import { CalendarBox } from './components';

const renderEventContent = (evtInfo) => {
  return (
    <>
      <span style={{ marginRight: 3, fontSize: 13 }}>{evtInfo.timeText}</span>
      <b>{evtInfo.event.title}</b>
    </>
  );
};

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
          right: 'dayGridMonth,listWeek',
        }}
        dayMaxEvents={true}
        selectable={true}
        eventContent={renderEventContent}
      />
    </CalendarBox>
  );
};

export default Calendar;
