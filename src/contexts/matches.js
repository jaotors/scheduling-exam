import React, { useState, createContext } from 'react';
import generateMatch from '../utils/generateMatch';

export const MatchContext = createContext();
const generatedMatches = generateMatch();

export const MatchContextProvider = (props) => {
  const [matches, setMatches] = useState(generatedMatches);

  return (
    <MatchContext.Provider value={[matches, setMatches]}>
      {props.children}
    </MatchContext.Provider>
  );
};
