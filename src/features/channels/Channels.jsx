import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Channel from './Channel.jsx';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  return (
    <Nav variant="pills" className="d-flex flex-column" defaultActiveKey="/home">
      {channels.length > 0
        && channels.map(({ id, name, removable }) => (
          <Channel
            key={id}
            id={id}
            name={name}
            removable={removable}
            currentChannelId={currentChannelId}
          />
        ))}
    </Nav>
  );
};

export default Channels;
