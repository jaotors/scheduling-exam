import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import { Layer, Button, Box, Heading, TextInput } from 'grommet';

export const CalendarBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* for overriding the css of @fullcalendar */
  .fc {
    width: 90%;
    height: 90%;
  }

  .fc-button-primary {
    &:not(:disabled).fc-button-active {
      background-color: #3d138d;
      border-color: #3d138d;

      &:hover {
        background-color: #3d138d;
        border-color: #3d138d;
      }
      &:focus {
        box-shadow: 0 0 0 2px #6fffb0;
      }
    }

    background-color: #7d4cdb;
    border-color: #7d4cdb;

    &:not(:disabled):hover {
      background-color: #3d138d;
      border-color: #3d138d;
    }

    &:focus {
      box-shadow: 0 0 2px 2px #6fffb0;
    }
  }

  .fc-h-event {
    border-color: #896ac2;
    background-color: #896ac2;
  }

  .fc-event-main {
    white-space: normal;
    word-wrap: break-word;
  }
`;

export const AddMatchLayer = ({ calendarApi, selectInfo, onClose }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');

  const onAdd = useCallback(() => {
    calendarApi.unselect();

    calendarApi.addEvent(
      {
        id: `${+moment()}${username}`,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        extendedProps: {
          meta: {
            username,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
          },
        },
      },
      true
    );
    onClose();
  }, [title, username, calendarApi, selectInfo, onClose]);

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box pad="medium" gap="medium">
        <Box direction="column" gap="medium">
          <Heading level="3" margin="none">
            Add Match
          </Heading>
          <TextInput
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            innerRef={(input) => input.focus()}
          />
          <TextInput
            placeholder="Opponent Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box direction="row" gap="medium" align="center" justify="center">
          <Button label="Add" primary={true} onClick={onAdd} />
          <Button label="Cancel" onClick={onClose} />
        </Box>
      </Box>
    </Layer>
  );
};

export const RemoveMatchLayer = ({ info, onClose }) => {
  const onRemove = useCallback(() => {
    info.event.remove();
    onClose();
  }, [info, onClose]);

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box pad="medium" gap="medium">
        <Heading level="4" margin="none">
          Are you sure you want to remove{' '}
          <b>
            [{info.title} {info.username}]
          </b>
          ?
        </Heading>
        <Box direction="row" gap="medium" align="center" justify="center">
          <Button color="status-critical" label="Yes" onClick={onRemove} />
          <Button label="No" onClick={onClose} />
        </Box>
      </Box>
    </Layer>
  );
};
