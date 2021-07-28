// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';

import useWebSocket from '../../../hooks/useWebSocket.js';

export default () => {
  const { socket } = useWebSocket();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.currentChannelId);
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }, { resetForm }) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));

      socket.emit('newMessage', { text, username, channelId }, ({ status }) => {
        console.log(response);
      });
      resetForm();
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
