// @ts-check

import React from 'react';
import { Nav, Button } from 'react-bootstrap';

const Channel = ({ channel, currentChannelId }) => {
  const { id, name } = channel;
  const isActiveChannel = id === currentChannelId;
  const buttonVariant = isActiveChannel ? 'primary' : 'light';

  return (
    <Nav.Item>
      <Nav.Link as={Button} variant={buttonVariant} className="mb-1 w-100">
        { name }
      </Nav.Link>
    </Nav.Item>
  );
};

export default Channel;
