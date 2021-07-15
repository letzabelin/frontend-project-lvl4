// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { io } from 'socket.io-client';

import { CommonLayout } from '../../components/index.js';
import SidePanel from '../../features/channels/SidePanel.jsx';
import MessageForm from '../../features/messages/MessageForm.jsx';
import Messages from '../../features/messages/Messages.jsx';
import fetchAllData from '../../store/fetchAllData.js';

const getAuthHeaders = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId?.token ? { Authorization: `Bearer ${userId.token}` } : {};
};

const Chat = () => {
  const dispatch = useDispatch();
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const headers = getAuthHeaders();
      dispatch(fetchAllData({ headers }));
    };

    getData();
  }, []);

  return (
    <CommonLayout>
      <Container className="h-100 my-4 shadow overflow-hidden">
        <Row className="h-100">
          <Col xs={4} md={2} className="pt-5 border-2 border-end px-0 h-100">
            <SidePanel />
          </Col>
          <Col className="h-100">
            <div className="d-flex flex-column h-100">
              <div>
                Title
              </div>
              <Messages />
              <MessageForm />
            </div>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default Chat;
