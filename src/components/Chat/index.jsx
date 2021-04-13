import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Channels from '../Channels/index.jsx';
import Messages from '../Messages/index.jsx';
import Form from '../Form/index.jsx';

const Chat = () => {
  const { messages } = useSelector((state) => state);

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
