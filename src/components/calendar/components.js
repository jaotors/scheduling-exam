import styled from 'styled-components';

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
      background-color: #896ac2;
      border-color: #896ac2;

      &:hover {
        background-color: #896ac2;
        border-color: #896ac2;
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
`;
