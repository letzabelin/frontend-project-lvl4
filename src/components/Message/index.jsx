import React, { useContext } from 'react';

import AuthContext from '../../context/index.js';

const Message = ({ message: { text } }) => {
  const username = useContext(AuthContext);
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
