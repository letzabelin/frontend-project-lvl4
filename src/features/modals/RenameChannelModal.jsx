// @ts-check

import { useFormik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { channelsSelectors } from '../chat/channels/channelsSlice.js';

const ChannelForm = ({
  name: channelName, children, onRename, onHide,
}) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const [isAuthFailed, setAuthFailed] = useState(false);

  const nameRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    onSubmit: ({ name }) => {
      const isChannelAlreadyExist = channels.some((channel) => channel.name === name);

      if (isChannelAlreadyExist) {
        setAuthFailed(true);

        nameRef.current.focus();
        nameRef.current.select();

        return;
      }

      onRename(name);
      onHide();
      setAuthFailed(false);
    },
  });

  useEffect(() => {
    nameRef.current.focus();
    nameRef.current.select();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Control
        data-testid="rename-channel"
        isInvalid={isAuthFailed}
        ref={nameRef}
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        required
      />
      <Form.Control.Feedback type="invalid">Имя должно быть уникальным</Form.Control.Feedback>
      <div className="d-flex justify-content-end mt-2">
        {children}
      </div>
    </Form>
  );
};

const RenameChannelModal = ({
  show, onHide, onRename, name,
}) => {
  const { t } = useTranslation();

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('channels.actions.rename')}
          {' '}
          {t('channels.channel')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ChannelForm name={name} onRename={onRename} onHide={onHide}>
          <Button variant="secondary" className="me-2" onClick={onHide}>
            {t('channels.actions.cancel')}
          </Button>
          <Button type="submit" variant="success">
            {/* {t('channels.actions.rename')} */}
            {t('channels.actions.send')}
          </Button>
        </ChannelForm>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
