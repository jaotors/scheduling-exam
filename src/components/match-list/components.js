import React from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import { Box, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

const MatchListBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  min-height: 400px;

  li {
    padding: 7px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.33);

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const MatchListBox = ({ onSearch, data }) => {
  const sortedData = data.sort((a, b) => {
    const momentA = moment(a.meta.date);
    const momentB = moment(b.meta.date);
    return momentA.diff(momentB);
  });

  return (
    <MatchListBlock>
      <div
        css={`
          width: 90%;
          height: 90%;
        `}
      >
        <Box
          direction="row"
          justify="between"
          css={`
            margin-bottom: 10px;
          `}
        >
          <Box
            css={`
              width: 85%;
              font-size: 2rem;
            `}
          >
            Match List
          </Box>
          <Box
            css={`
              width: 20%;
            `}
          >
            <TextInput
              icon={<Search />}
              size="xsmall"
              onChange={(e) => onSearch(e.target.value)}
              placeholder="username"
            />
          </Box>
        </Box>
        <div
          css={`
            border: 1px solid rgba(0, 0, 0, 0.33);
            border-radius: 4px;
          `}
        >
          <List>
            {sortedData.length ? (
              sortedData.map((match) => {
                return (
                  <React.Fragment key={match.id}>
                    <li
                      css={`
                        display: flex;
                        justify-content: space-between;
                      `}
                    >
                      <b>{moment(match.meta.date).format('MMMM DD, YYYY')}</b>
                      <b>{moment(match.meta.date).format('dddd')}</b>
                    </li>
                    <li>
                      Match with <b>{match.meta.userName}</b>
                    </li>
                  </React.Fragment>
                );
              })
            ) : (
              <div
                css={`
                  min-height: 400px;
                  display: grid;
                  place-items: center;
                `}
              >
                <span>No such keyword</span>
              </div>
            )}
          </List>
        </div>
      </div>
    </MatchListBlock>
  );
};
