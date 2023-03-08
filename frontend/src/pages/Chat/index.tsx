import { useEffect } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import type { IServerChatsResponse } from '@/types/Chat';
import { Container, Col, Row } from 'react-bootstrap';
import { ChannelsBar } from '@/components';

// eslint-disable-next-line arrow-body-style
const ChatPage = () => {
  const auth = useAuth();

  // useEffect(() => {
  //   const fetchChannels = async (token: string) => {
  //     const {
  //       data: { channels, currentChannelId, messages },
  //     }: IServerChatsResponse = await axios.get('/api/v1/data', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     debugger;
  //   };

  //   if (auth.user?.token) {
  //     fetchChannels(auth.user?.token);
  //   }
  // }, []);

  return (
    <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center py-4 px-0">
      <Row className="w-100 h-100 shadow">
        <Col md="2" className="h-100 p-0 border-end bg-light">
          <ChannelsBar />
        </Col>

        <Col>

        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
