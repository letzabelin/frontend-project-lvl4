import React from 'react';

const Message = ({ text, username }) => (
  <p className="text-break">
    {`${username}: ${text}`}
  </p>
);

export default Message;
