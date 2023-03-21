import { useEffect, useRef } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSendMessageMutation } from '@/redux/api/chatWebsocketApi';
import { ICurrentChannelId, IMessage } from '@/types/Chat';
import { useAppSelector, useAuth } from '@/hooks';
import { selectChannelById } from '@/redux/slices/channels/channelsSlice';

interface Props {
  currentChannelId: ICurrentChannelId;
  messages: IMessage[];
}

const ChatBox = ({ messages, currentChannelId }: Props): JSX.Element => {
  const auth = useAuth();
  const currentChannel = useAppSelector((state) => selectChannelById(state, currentChannelId));
  const inputRef = useRef<HTMLInputElement>(null);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const messageScheme = yup.object({
    text: yup.string().trim().required().default(''),
  });

  const formik = useFormik({
    initialValues: messageScheme.getDefault(),
    validationSchema: messageScheme,

    async onSubmit({ text }, { resetForm }) {
      if (text.trim() === '' || !auth.user || !currentChannel) {
        return;
      }

      await sendMessage({
        text,
        username: auth.user.username,
        channelId: currentChannel.id,
      });

      resetForm();

      inputRef.current?.focus();
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <header className="bg-light p-3 mb-3 shadow-sm small">
        <p className="fw-bold m-0">
          #&nbsp;
          {currentChannel?.name ?? 'unknown'}
        </p>
        <span className="text-muted">
          {messages.length}
          &nbsp;сообщений
        </span>
      </header>

      <main className="px-5 overflow-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <span className="fw-bold">
              {message.username}
              :
              &nbsp;
            </span>
            {message.text}
          </div>
        ))}
      </main>

      <footer className="p-4 mt-auto">
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Form.Control placeholder="Введите сообщение..." ref={inputRef} {...formik.getFieldProps('text')} />

            <Button type="submit" variant="outline-primary" disabled={isLoading}>
              Отправить
            </Button>
          </InputGroup>
        </Form>
      </footer>
    </div>
  );
};

export default ChatBox;
