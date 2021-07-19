import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DeleteChannelModal = ({ show, onHide, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('channels.actions.delete')}
          {' '}
          {t('channels.channel')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="fs-5">
        {t('channels.question')}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('channels.actions.cancel')}
        </Button>
        <Button variant="danger" onClick={onDelete}>
          {t('channels.actions.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
