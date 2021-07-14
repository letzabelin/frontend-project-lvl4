// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

import { CommonLayout } from '../../components/index.js';
import SidePanel from '../../features/channels/SidePanel.jsx';
import MessageForm from '../../features/messages/MessageForm.jsx';
import Messages from '../../features/messages/Messages.jsx';
import createFetchDataThunk from '../../store/fetchAllData.js';

const getAuthHeaders = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId?.token ? { Authorization: `Bearer ${userId.token}` } : {};
};

const Chat = () => {
  const dispatch = useDispatch();
  const fetchAllData = createFetchDataThunk();

  useEffect(() => {
    const getData = async () => {
      const headers = getAuthHeaders();
      dispatch(fetchAllData({ headers }));
    };

    getData();
  }, []);

  return (
    <CommonLayout>
      <Container className="h-100 my-4 shadow">
        <Row className="h-100">
          <Col xs={2} className="pt-5 border-2 border-end px-0">
            <SidePanel />
          </Col>
          <Col>
            <div className="d-flex flex-column justify-content-between h-100">
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
