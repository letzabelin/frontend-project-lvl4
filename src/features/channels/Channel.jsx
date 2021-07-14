import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const Channel = ({
  id, name, removable, currentChannelId,
}) => {
  const isActiveChannel = id === currentChannelId;

  return (
    <Nav.Item className="w-100 px-2">
      <Button active={isActiveChannel} variant="outline-secondary" className="w-100 rounded-0 border-0 text-start">
        {`# ${name}`}
      </Button>
    </Nav.Item>
  );
};

export default Channel;
