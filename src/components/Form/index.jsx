import React, { useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form as BForm,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

import getRoute from '../../routes.js';
import { actions as messageActions } from '../../reducers/messages.js';

const Form = () => {
  const { currentChannelId } = useSelector((state) => state);
  const messageRoute = getRoute.channelMessagesPath(currentChannelId);
  const { addMessage } = messageActions;
  const dispatch = useDispatch();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }, { resetForm }) => {
      const attributes = { text };
      const { data } = await axios.post(messageRoute, { data: { attributes } });
      dispatch(addMessage({ message: data.data.attributes }));

      resetForm({ text: '' });
    },
  });

  return (
    <BForm onSubmit={formik.handleSubmit} noValidate>
      <InputGroup size="lg">
        <FormControl
          ref={inputRef}
          id="text"
          name="text"
          placeholder="Type text..."
          aria-label="Input"
          onChange={formik.handleChange}
          value={formik.values.text}
        />
        <InputGroup.Append>
          <Button variant="outline-success" type="submit" style={{ minWidth: '80px' }}>
            Sent
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </BForm>
  );
};

export default Form;
