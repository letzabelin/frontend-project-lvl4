// @ts-check

import React, { useEffect } from 'react';
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
  const { addChannel, deleteChannel, renameChannel } = channelsActions;
  const { setCurrentChannel } = currentChannelIdActions;

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  useEffect(() => {
    socket.on('removeChannel', (res) => {
      dispatch(deleteChannel({ id: res.id }));
    });
  }, [socket]);

  useEffect(() => {
    socket.on('renameChannel', (res) => {
      dispatch(renameChannel(res));
    });
  }, [socket]);

  useEffect(() => {
    socket.on('newChannel', (res) => {
      dispatch(addChannel(res));
    });
  }, [socket]);

  const handleClick = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const onDelete = (id) => () => {
    socket.emit('removeChannel', { id });
  };

  const onRename = (id) => (name) => {
    socket.emit('renameChannel', { id, name });
  };

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
