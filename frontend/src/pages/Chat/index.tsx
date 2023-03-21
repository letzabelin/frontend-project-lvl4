import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { ChannelsBar, ChatBox } from '@/components';
import { useAppSelector } from '@/hooks';
import { useGetChatDataQuery } from '@/redux/api/chatDataApi';
import { selectAllChannels, selectCurrentChannelId } from '@/redux/slices/channels/channelsSlice';
import { selectMessagesByChannelId } from '@/redux/slices/messages/messagesSlice';
import { ICurrentChannelId } from '@/types/Chat';
import { useGetWebsocketMessagesQuery } from '@/redux/api/chatWebsocketApi';

const ChatPage = (): JSX.Element => {
  const { isLoading, isError, isSuccess } = useGetChatDataQuery();

  useGetWebsocketMessagesQuery(undefined);

  const channels = useAppSelector(selectAllChannels);
  const messages = useAppSelector(selectMessagesByChannelId);
  const currentChannelId = useAppSelector(selectCurrentChannelId) as ICurrentChannelId;

  let content;

  if (isLoading) {
    content = <Spinner animation="border" variant="primary" />;
  } else if (isError) {
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

  return <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center py-4 px-0">{content}</Container>;
};

export default ChatPage;
