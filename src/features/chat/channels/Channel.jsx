// @ts-check

import React from 'react';
import { Button, Nav } from 'react-bootstrap';

import ToggleContainer from './ToggleContainer.jsx';

const Channel = ({
  name,
  id,
  currentChannelId,
  removable,
  onDelete,
  onRename,
  handleClick,
}) => {
  const isActive = id === currentChannelId;
  const buttonStyle = isActive ? 'secondary' : 'light';

  const Btn = () => (
    <Button
      variant={buttonStyle}
      className="w-100 text-start text-truncate rounded-0"
      onClick={handleClick}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  return (
    <Nav.Item as="li" className="px-2 w-100">
      {removable ? (
        <ToggleContainer isActive={isActive} onDelete={onDelete} name={name} onRename={onRename}>
          <Btn />
        </ToggleContainer>
      ) : (
        <Btn />
      )}
    </Nav.Item>
  );
};

export default Channel;
