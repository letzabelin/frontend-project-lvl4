import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { ChannelsBar, ChatBox } from '@/components';
import { useGetChatDataQuery, selectAllChannels, selectMessagesByChannelId } from '@/features/api/apiSlice';
import { IRootState } from '@/app/store';
import { useSelector } from 'react-redux';

const ChatPage = (): JSX.Element => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetChatDataQuery();

  const channels = useSelector((state: IRootState) => selectAllChannels(state));
  const messages = useSelector((state: IRootState) => selectMessagesByChannelId(state));

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" variant="primary" />
    );
  } else if (isError) {
    content = (
      <h1>
        Oops, something went wrong:
      </h1>
    );
  } else if (isSuccess) {
    content = (
      <Row className="w-100 h-100 shadow">
        <Col md="2" className="h-100 p-0 border-end bg-light">
          <ChannelsBar channels={channels} currentChannelId={data.currentChannelId} />
        </Col>

        <Col className="h-100 p-0">
          <ChatBox messages={messages} />
        </Col>
      </Row>
    );
  }

  return (
    <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center py-4 px-0">
      {content}
    </Container>
  );
};

export default ChatPage;
