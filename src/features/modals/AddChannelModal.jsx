import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useWebSocket from '../../hooks/useWebSocket.js';
import { channelsActions, channelsSelectors } from '../chat/channels/channelsSlice.js';

const ChannelForm = ({ children, onHide }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const [isAuthFailed, setAuthFailed] = useState(false);
  const { addChannel } = channelsActions;
  const { socket } = useWebSocket();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      const isChannelAlreadyExist = channels.some((channel) => channel.name === name);

      if (isChannelAlreadyExist) {
        setAuthFailed(true);

        nameRef.current.focus();
        nameRef.current.select();

        return;
      }

      socket.emit('newChannel', { name });
      onHide();
    },
  });

  socket.on('newChannel', (res) => {
    dispatch(addChannel(res));
  });

  useEffect(() => {
    nameRef.current.focus();
  }, [null]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Control
        data-testid="add-channel"
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

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation();

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('channels.actions.add')}
          {' '}
          {t('channels.channel')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ChannelForm onHide={onHide}>
          <Button variant="secondary" className="me-2" onClick={onHide}>
            {t('channels.actions.cancel')}
          </Button>
          <Button type="submit" variant="success">
            {t('channels.actions.add')}
          </Button>
        </ChannelForm>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
