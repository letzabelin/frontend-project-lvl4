import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

// import { Channels, Messages, Form } from '../../components/index.js';
import { CommonLayout } from '../../components/index.js';
import useAuth from '../../hooks/index.js';

const getAuthHeaders = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId?.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const Chat = () => {
  // const { messages } = useSelector((state) => state);

  // useEffect(() => {
  //   const getData = async () => {
  //     const headers = getAuthHeaders();

  //     try {
  //       await axios.get('/api/v1/data', { headers });

  //     } catch (e) {
  //       console.log('ss');
  //     }
  //   };

  //   getData();
  // }, []);

  return (
    <CommonLayout>
      <div>
        hello
      </div>
    </CommonLayout>
  );

  // return (
  //   <Row className="h-100">
  //     <Col xs={3}>
  //       <Channels />
  //     </Col>
  //     <Col>
  //       <div className="d-flex flex-column h-100">
  //         <div>
  //           <Messages messages={messages} />
  //         </div>
  //         <div className="mt-auto">
  //           <Form handleSubmit={postMessage} />
  //         </div>
  //       </div>
  //     </Col>
  //   </Row>
  // );
};

export default Chat;
