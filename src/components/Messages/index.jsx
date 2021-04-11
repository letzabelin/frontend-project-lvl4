import React from 'react';

import { Message } from '../index.js';

const Messages = ({ messages }) => (
  <ul>
    {
      messages.length > 0 && messages.map((message) => (
        <Message key={message.id} message={message} />
      ))
    }
  </ul>
);

export default Messages;
