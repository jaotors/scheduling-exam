import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Sidebar as GrommetSidebar, Nav, Button } from 'grommet';
import { User, List, Calendar } from 'grommet-icons';

import Tooltip from '../tooltip';

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState('/');
  const history = useHistory();

  const onClick = (path) => {
    setActiveNav(path);
    history.push(path);
  };

  useEffect(() => {
    setActiveNav(window.location.pathname);
  }, []);

  return (
    <GrommetSidebar
      header={
        <Button
          style={{ border: '1px solid #fff', borderRadius: '50%' }}
          icon={<User />}
        />
      }
    >
      <Nav>
        <Tooltip placement="right" trigger="hover" tooltip="Calendar">
          <Button
            onClick={() => onClick('/')}
            icon={<Calendar />}
            active={activeNav === '/'}
            hoverIndicator
          />
        </Tooltip>
        <Tooltip placement="right" trigger="hover" tooltip="Match List">
          <Button
            onClick={() => onClick('/match-list')}
            icon={<List />}
            active={activeNav === '/match-list'}
            hoverIndicator
          />
        </Tooltip>
      </Nav>
    </GrommetSidebar>
  );
};

export default Sidebar;
