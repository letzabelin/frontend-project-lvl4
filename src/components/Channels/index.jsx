// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

import { Channel } from '../Channel/index.jsx';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state);

  return (
    <>
      <h3>Channels:</h3>
      <Nav variant="tabs" className="flex-column border-0">
        {
          channels.map((channel) => (
            <Channel key={channel.id} channel={channel} currentChannelId={currentChannelId}/>
          ))
        }
      </Nav>
    </>
  );
};

export default Channels;
