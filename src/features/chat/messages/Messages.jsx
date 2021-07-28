// @ts-check

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';
import { messagesSelectors, messagesActions } from './messagesSlice.js';
// import { useWebSocket } from '../../../hooks/index.js';

const Messages = () => {
  // const { socket } = useWebSocket();
  // const { addMessage } = messagesActions;
  // const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const currentMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  // useEffect(() => {
  //   socket.on('newMessage', (message) => {
  //     dispatch(addMessage(message));
  //   });
  // }, [socket]);

  return (
    <>
      {currentMessages.length > 0 && (
        <div className="overflow-auto pt-4">
          {currentMessages.map(({ id, text, username }) => (
            <Message key={id} text={text} username={username} />
          ))}
        </div>
      )}
      <MessageForm />
    </>
  );
};

export default Messages;
