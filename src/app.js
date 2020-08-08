import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

import { MatchContextProvider } from './contexts/matches';

import Calendar from './components/calendar';
import Sidebar from './components/sidebar';

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'nav main';
  grid-template-columns: auto 1fr;
  height: 100%;
`;

const SidebarArea = ({ children }) => (
  <Box gridArea="nav" background="brand">
    {children}
  </Box>
);

const MainArea = ({ children }) => (
  <Box gridArea="main" background="light-2" pad="small">
    {children}
  </Box>
);

const Route = () => {};

const App = () => {
  return (
    <MatchContextProvider>
      <div
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <Layout>
          <SidebarArea>
            <Sidebar />
          </SidebarArea>
          <MainArea>
            <Calendar />
          </MainArea>
        </Layout>
      </div>
    </MatchContextProvider>
  );
};

export default App;
