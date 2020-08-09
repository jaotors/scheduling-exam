import React, { useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import listPlugin from '@fullcalendar/list';
import { MatchContext } from '../../contexts/matches';

import { CalendarBox } from './components';

const renderEventContent = (evtInfo) => {
  return (
    <>
      {evtInfo.timeText && (
        <span style={{ marginRight: 3, fontSize: 13 }}>{evtInfo.timeText}</span>
      )}
      <span>
        {evtInfo.event.title} <b>{evtInfo.event.extendedProps.meta.userName}</b>
      </span>
    </>
  );
};

const Calendar = () => {
  // this will go to contextAPI
  const [matches, setMatches] = useContext(MatchContext);
  return (
    <CalendarBox>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth',
        }}
        dayMaxEvents={true}
        selectable={true}
        eventContent={renderEventContent}
        events={matches}
      />
    </CalendarBox>
  );
};

export default Calendar;
