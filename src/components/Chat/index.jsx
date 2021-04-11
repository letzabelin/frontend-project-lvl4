import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, } from 'react-bootstrap';

import { Channels, Messages, Form } from '../index.js';

const Chat = () => {
  const { channels, messages } = useSelector((state) => state);

  return (
    <Row className="h-100">
      <Col xs={3}>
        <Channels />
      </Col>
      <Col>
        <div className="d-flex flex-column h-100">
          <div>
            <Messages messages={messages} />
          </div>
          <div className="mt-auto">
            <Form handleSubmit={postMessage} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
