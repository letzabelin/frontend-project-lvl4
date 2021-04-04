import React from 'react';
import { Nav } from 'react-bootstrap';

const Channel = ({ name }) => {
  return (
    <Nav.Item>
      <Nav.Link>
        { name }
      </Nav.Link>
    </Nav.Item>
  );
};

export default Channel;
