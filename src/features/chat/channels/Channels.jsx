import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import useWebSocket from '../../../hooks/useWebSocket.js';
import Channel from './Channel.jsx';
import ChannelHeader from './ChannelHeader.jsx';
import { channelsActions, channelsSelectors } from './channelsSlice.js';
import { currentChannelIdActions } from './currentChannelIdSlice.js';


const Channels = () => {
  const dispatch = useDispatch();
  const { socket } = useWebSocket();
  const { deleteChannel, renameChannel } = channelsActions;
  const { setCurrentChannel } = currentChannelIdActions;

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleClick = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const onDelete = (id) => () => {
    socket.emit('removeChannel', { id });
  };

  socket.on('removeChannel', (res) => {
    dispatch(deleteChannel({ id: res.id }));
  });

  const onRename = (id) => (name) => {
    socket.emit('renameChannel', { id, name });
  };

  socket.on('renameChannel', (res) => {
    dispatch(renameChannel(res));
  });

  return (
    <>
      <ChannelHeader />
      <Nav variant="pills" as="ul" className="flex-column">
        {channels.map(({ id, name, removable }) => (
          <Channel
            key={id}
            id={id}
            name={name}
            removable={removable}
            currentChannelId={currentChannelId}
            onDelete={onDelete(id)}
            onRename={onRename(id)}
            handleClick={handleClick(id)}
          />
        ))}
      </Nav>
    </>
  );
};

export default Channels;
