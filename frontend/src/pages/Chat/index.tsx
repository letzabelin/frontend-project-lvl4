import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { AxiosError } from 'axios';
import { ChannelsBar, ChatBox, Modal } from '@/components';
import { useAppSelector, useAuth } from '@/hooks';
import { useGetChatDataQuery } from '@/redux/api/chatDataApi';
import { selectAllChannels, selectCurrentChannelId } from '@/redux/slices/channels/channelsSlice';
import { selectMessagesByChannelId } from '@/redux/slices/messages/messagesSlice';
import { useGetWebsocketMessagesQuery } from '@/redux/api/chatWebsocketApi';
import type { ICurrentChannelId } from '@/types';

const ChatPage = (): JSX.Element => {
  const { isLoading, isError, isSuccess, error } = useGetChatDataQuery();
  const auth = useAuth();

  useGetWebsocketMessagesQuery(undefined);

  const channels = useAppSelector(selectAllChannels);
  const messages = useAppSelector(selectMessagesByChannelId);
  const currentChannelId = useAppSelector(selectCurrentChannelId) as ICurrentChannelId;
  const { isOpened, type } = useAppSelector((state) => state.modalsInformation);

  let content;

  if (isLoading) {
    content = <Spinner animation="border" variant="primary" />;
  } else if (isError) {
    const UNAUTHORIZED_STATUS_CODE = 401;
    const axiosError = error as AxiosError;

    if (axiosError.status === UNAUTHORIZED_STATUS_CODE) {
      auth.logout();
    }

    content = <h1>Oops, something went wrong:</h1>;
  } else if (isSuccess) {
    content = (
      <Row className="w-100 h-100 shadow">
        <Col md="2" className="h-100 p-0 border-end bg-light">
          <ChannelsBar channels={channels} currentChannelId={currentChannelId} />
        </Col>

        <Col className="h-100 p-0">
          <ChatBox messages={messages} currentChannelId={currentChannelId} />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center py-4 px-0 h-100 overflow-auto">
        {content}
      </Container>

      <Modal opened={isOpened} type={type} />
    </>
  );
};

export default ChatPage;
