import React from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import { Box, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

import matchesToList from '../../utils/matchesToList';

const MatchListArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MatchListBlock = styled.div`
  width: 70%;
  height: 90%;
  max-height: 856px;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
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
    const momentA = moment(a.start);
    const momentB = moment(b.start);
    return momentA.diff(momentB);
  });

  console.log(sortedData);

  const transformedData = matchesToList(sortedData);

  return (
    <MatchListArea>
      <MatchListBlock>
        <Box
          direction="row"
          justify="between"
          css={`
            position: sticky;
            background-color: #f2f2f2;
            margin-bottom: 10px;
            top: 0;
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
            {transformedData.length ? (
              transformedData.map((match) => {
                return (
                  <React.Fragment key={match.id}>
                    <li
                      css={`
                        display: flex;
                        justify-content: space-between;
                      `}
                    >
                      <b>{moment(match.date).format('MMMM DD, YYYY')}</b>
                      <b>{moment(match.date).format('dddd')}</b>
                    </li>
                    {match.meta.map((m) => {
                      return (
                        <li>
                          {m.title} <b>{m.username}</b>
                        </li>
                      );
                    })}
                  </React.Fragment>
                );
              })
            ) : (
              <div
                css={`
                  min-height: 800px;
                  display: grid;
                  place-items: center;
                `}
              >
                <span>No such keyword</span>
              </div>
            )}
          </List>
        </div>
      </MatchListBlock>
      <div
        css={`
          margin-left: 10px;
        `}
      >
        <img
          src="https://media1.tenor.com/images/9b8183e36486c98d73bd5ed915c93b0c/tenor.gif"
          alt="pusheen-gaming"
        />
      </div>
    </MatchListArea>
  );
};
