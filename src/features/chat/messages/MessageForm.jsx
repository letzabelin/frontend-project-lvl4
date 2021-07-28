// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';

import { useWebSocket } from '../../../hooks/index.js';
import { messagesActions } from './messagesSlice.js';

export default () => {
  const { socket } = useWebSocket();
  const { t } = useTranslation();
  const { addMessage } = messagesActions;
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.currentChannelId);
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: ({ text }, { resetForm }) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));

      socket.emit('newMessage', { text, username, channelId }, ({ status }) => {
        if (status === 'ok') {
          dispatch(addMessage({
            text, username, channelId, id: `${username}/${channelId}`,
          }));
          resetForm();
        }
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  return (
    <Form onSubmit={formik.handleSubmit} className="mb-3 pt-5 mt-auto">
      <InputGroup>
        <FormControl
          autoComplete="off"
          data-testid="new-message"
          placeholder={t('messages.placeholder')}
          value={formik.values.text}
          onChange={formik.handleChange}
          name="text"
          ref={inputRef}
          // disabled={formik.isSubmitting}
        />
        {/* <Button type="submit" variant="outline-success" disabled={formik.isSubmitting || !formik.dirty}> */}
        <Button type="submit" variant="outline-success">
          {t('messages.button')}
        </Button>
      </InputGroup>
    </Form>
  );
};
