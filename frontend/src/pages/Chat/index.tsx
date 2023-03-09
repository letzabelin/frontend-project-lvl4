import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { ChannelsBar, ChatBox } from '@/components';
import { useGetChatDataQuery } from '@/features/api/apiSlice';

const ChatPage = (): JSX.Element => {
  const {
    data: { channels, messages, currentChannelId } = { channels: [], messages: [], currentChannelId: null },
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetChatDataQuery();

  let content;

  if (isLoading || isFetching) {
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
          <ChannelsBar channels={channels} currentChannelId={currentChannelId} />
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
