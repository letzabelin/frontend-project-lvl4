// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';
import { messagesSelectors } from './messagesSlice.js';

const Messages = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <>
      <div className="overflow-auto pt-4">
        {currentMessages.map(({ id, text, username }) => (
          <Message key={id} text={text} username={username} />
        ))}
      </div>
      <MessageForm />
    </>
  );
};

export default Messages;
