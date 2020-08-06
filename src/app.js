import React from 'react';
import { Box, Sidebar, Avatar, Nav, Button } from 'grommet';
import { Projects, Clock, User } from 'grommet-icons';
import styled from 'styled-components';

import Calendar from './components/calendar';

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

const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Layout>
        <SidebarArea>
          <Sidebar
            header={
              <Button
                style={{ border: '1px solid #fff', borderRadius: '50%' }}
                icon={<User />}
              />
            }
          >
            <Nav>
              <Button icon={<Projects />} hoverIndicator />
              <Button icon={<Clock />} hoverIndicator />
            </Nav>
          </Sidebar>
        </SidebarArea>
        <MainArea>
          <Calendar />
        </MainArea>
      </Layout>
    </div>
  );
};

export default App;
