import React, { useContext } from 'react';

import UserContext from '../../context/index.js';

const Message = ({ message: { text } }) => {
  const username = useContext(UserContext);
  const messageText = (
    <span>
      <b>{username}</b>
      :
      {' '}
      {text}
    </span>
  );

  return (
    <li>
      {messageText}
    </li>
  );
};

export default Message;
