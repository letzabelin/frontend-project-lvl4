// @ts-check

import axios from 'axios';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { CommonLayout } from '../../components/index.js';

const getAuthHeaders = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId?.token ? { Authorization: `Bearer ${userId.token}` } : {};
};

const Chat = () => {
  useEffect(() => {
    const getData = async () => {
      const headers = getAuthHeaders();
      const data = await axios.get('/api/v1/data', { headers });
      console.log(data);
    };

    getData();
  }, []);

  return (
    <CommonLayout>
      <Container className="h-100">
        <Row className="h-100">
          <Col xs={3} className="pt-5 border-2 border-end">
            hello
          </Col>
          <Col>
            world
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default Chat;
