import React, { useState, createContext } from 'react';
import generateMatch from '../utils/generateMatch';

export const MatchContext = createContext();

export const MatchContextProvider = (props) => {
  const [matches, setMatches] = useState(generateMatch());

  return (
    <MatchContext.Provider value={[matches, setMatches]}>
      {props.children}
    </MatchContext.Provider>
  );
};
