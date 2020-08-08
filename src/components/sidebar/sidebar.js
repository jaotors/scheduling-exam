import React from 'react';
import { Sidebar as GrommetSidebar, Nav, Button } from 'grommet';
import { User, List, Calendar } from 'grommet-icons';

const Sidebar = () => (
  <GrommetSidebar
    header={
      <Button
        style={{ border: '1px solid #fff', borderRadius: '50%' }}
        icon={<User />}
      />
    }
  >
    <Nav>
      <Button icon={<Calendar />} hoverIndicator />
      <Button icon={<List />} hoverIndicator />
    </Nav>
  </GrommetSidebar>
);

export default Sidebar;
