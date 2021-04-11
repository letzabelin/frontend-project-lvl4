// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

import { Channel } from '../index.js';

const Channels = () => {
  const data = useSelector((state) => state);
  const { channels, currentChannelId } = data;

  return (
    <>
      <h3>Channels:</h3>
      <Nav variant="tabs" className="flex-column border-0">
        {
          channels.map((channel) => (
            <Channel key={channel.id} channel={channel}/>
          ))
        }
      </Nav>
    </>
  );
};

export default Channels;
