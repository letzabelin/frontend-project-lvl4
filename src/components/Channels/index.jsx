import React from 'react';
import { Nav } from 'react-bootstrap';

import { Channel } from '../index.js';
import gon from 'gon';

const Channels = () => {
  console.log(gon);
  const { channels } = gon;

  return (
    <>
    <h3>Channels</h3>
    <Nav variant="tabs" className="flex-column border-0">
      {channels.map(({ name }) => <Channel key={name + 1} name={name} />)}
    </Nav>
    </>
  );
};

export default Channels;
