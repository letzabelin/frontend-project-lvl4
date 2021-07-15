import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <div className="overflow-auto">
      {messages.map(({ text }) => <Messages text={text} />)}
    </div>
  );
};

export default Messages;
