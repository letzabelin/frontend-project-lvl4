import { useEffect, useRef } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { IRootState } from '@/app/store';
import { useSendMessageMutation, selectCurrentChannel } from '@/features/api/apiSlice';
import { IMessages } from '@/types/Chat';
import useAuth from '@/hooks/useAuth';

interface Props {
  messages: IMessages;
}

const ChatBox = ({ messages }: Props): JSX.Element => {
  const auth = useAuth();
  const currentChannel = useSelector((state: IRootState) => selectCurrentChannel(state));

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const messageScheme = yup.object({
    text: yup.string().trim().required().default(''),
  });

  const formik = useFormik({
    initialValues: messageScheme.getDefault(),
    validationSchema: messageScheme,

    async onSubmit({ text }) {
      if (text.trim() === '' || !auth.user || !currentChannel) {
        return;
      }

      await sendMessage({
        text,
        username: auth.user.username,
        channelId: currentChannel.id,
      });
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

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
              {auth.user?.username}
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

            <Button type="submit" variant="outline-primary">
              Отправить
            </Button>
          </InputGroup>
        </Form>
      </footer>
    </div>
  );
};

export default ChatBox;
