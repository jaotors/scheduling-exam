import React, { useState, useContext } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MatchContext } from '../../contexts/matches';
import { momentDateFormatter } from '../../utils/helpers';

import { CalendarBox, AddMatchLayer, RemoveMatchLayer } from './components';

const renderEventContent = (evtInfo) => {
  return (
    <>
      {evtInfo.timeText && (
        <span style={{ marginRight: 3, fontSize: 13 }}>{evtInfo.timeText}</span>
      )}
      <span>
        {evtInfo.event.title}{' '}
        <b>
          {evtInfo.event.extendedProps.meta &&
            evtInfo.event.extendedProps.meta.username}
        </b>
      </span>
    </>
  );
};

const Calendar = () => {
  const [matches, setMatches] = useContext(MatchContext);
  const [calendarapi, setCalendarAPI] = useState({});
  const [info, setInfo] = useState({});

  // for modals
  const [showAddModal, setShowAdd] = useState(false);
  const [showRemoveModal, setShowRemove] = useState(false);

  const handleDateSelect = (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;

    setCalendarAPI(calendarApi);
    setInfo(selectInfo);
    setShowAdd(true);
  };

  const handleEventClick = (data) => {
    setInfo({
      event: data.event,
      id: data.event.id,
      title: data.event.title,
      username: data.event.extendedProps.meta.username,
    });
    setShowRemove(true);
  };

  const onCalendarAdd = (data) => {
    // adding it to the context match
    const dateStart = momentDateFormatter(data.event.start);
    const dateEnd = momentDateFormatter(data.event.end);

    setMatches((prevMatches) =>
      prevMatches.concat({
        id: `${dateStart}-${dateEnd}${data.event.extendedProps.meta.username}`,
        title: data.event.title,
        start: data.event.allDay ? dateStart : data.event.start,
        end: data.event.allDay ? dateEnd : data.event.end,
        allDay: data.event.allDay,
        meta: data.event.extendedProps.meta,
      })
    );
  };

  // for drag-n-drop
  const onCalendarChange = (data) => {
    const dateStart = momentDateFormatter(data.event.start);
    const dateEnd = momentDateFormatter(data.event.end);
    const matchToUpdate = {
      ...matches.find((i) => i.id === data.event.id),
      start: dateStart,
      end: dateEnd,
    };

    const index = matches.findIndex((i) => i.id === data.event.id);
    const updatedMatches = matches
      .slice(0, index)
      .concat(matches.slice(index + 1));

    setMatches([...updatedMatches, matchToUpdate]);
  };

  const onCalendarRemove = (data) => {
    const index = matches.findIndex((i) => i.id === data.event.id);
    setMatches((prevMatches) =>
      prevMatches.slice(0, index).concat(prevMatches.slice(index + 1))
    );
  };

  const onCloseModal = () => {
    // for closing all the modal
    setShowAdd(false);
    setShowRemove(false);
  };

  return (
    <CalendarBox>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridDay',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventContent={renderEventContent}
        events={matches}
        select={handleDateSelect}
        eventAdd={onCalendarAdd}
        eventRemove={onCalendarRemove}
        eventClick={handleEventClick}
        eventChange={onCalendarChange}
      />
      {showAddModal && (
        <AddMatchLayer
          calendarApi={calendarapi}
          selectInfo={info}
          onClose={onCloseModal}
        />
      )}
      {showRemoveModal && (
        <RemoveMatchLayer info={info} onClose={onCloseModal} />
      )}
    </CalendarBox>
  );
};

export default Calendar;
