import React, { useContext } from 'react';

import { UserContext } from '../../context/index.js';

const Message = ({ message: { text } }) => {
  const username = useContext(UserContext);

  return (
    <li>
      {username}: {text}
    </li>;
  );
};

export default Message;
