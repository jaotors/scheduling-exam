import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MatchContextProvider } from './contexts/matches';

import Sidebar from './components/sidebar';
import Calendar from './components/calendar';
import MatchList from './components/match-list';

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

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Calendar />
    </Route>
    <Route path="/match-list" exact>
      <MatchList />
    </Route>
  </Switch>
);

const App = () => {
  return (
    <Router>
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
              <Routes />
            </MainArea>
          </Layout>
        </div>
      </MatchContextProvider>
    </Router>
  );
};

export default App;
