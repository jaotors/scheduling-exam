import React, { useState, useContext, useCallback } from 'react';
import __ from 'lodash/fp';

import { MatchContext } from '../../contexts/matches';

import { MatchListBox } from './components';

const MatchList = () => {
  const [matches, _] = useContext(MatchContext);
  const [filteredMatches, setFilteredMatches] = useState(matches);

  const searchOnChange = useCallback(
    __.debounce(500, (keyword) => {
      const regex = new RegExp(keyword, 'i');
      setFilteredMatches(
        matches.filter((match) => regex.test(match.meta.username))
      );
    }),
    [filteredMatches]
  );

  return <MatchListBox onSearch={searchOnChange} data={filteredMatches} />;
};

export default MatchList;
