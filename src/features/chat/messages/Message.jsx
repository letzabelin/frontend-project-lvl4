import React from 'react';

const Message = ({ text, username }) => (
  <p className="text-break ms-3">
    <span className="me-2">
      {username}
      :
    </span>
    <span>{text}</span>
  </p>
);

export default Message;
