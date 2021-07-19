import React, { useState } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DeleteChannelModal from '../../modals/DeleteChannelModal.jsx';
import RenameChannelModal from '../../modals/RenameChannelModal.jsx';

const ToggleContainer = ({
  children, onRename, onDelete, name, isActive,
}) => {
  const [shouldShowRenameModal, setShowRenameModal] = useState(false);
  const [shouldShowDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation();

  const buttonStyle = isActive ? 'secondary' : 'light';

  const onHideRenameModal = () => {
    setShowRenameModal(false);
  };

  const onHideDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Dropdown as={ButtonGroup} className="w-100">
        {children}
        <Dropdown.Toggle
          split
          variant={buttonStyle}
        />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowRenameModal(true)}>
            {t('channels.actions.rename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
            {t('channels.actions.delete')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <DeleteChannelModal
        show={shouldShowDeleteModal}
        onHide={onHideDeleteModal}
        onDelete={onDelete}
      />
      <RenameChannelModal
        show={shouldShowRenameModal}
        onHide={onHideRenameModal}
        onRename={onRename}
        name={name}
      />
    </>
  );
};

export default ToggleContainer;
