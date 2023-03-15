import { useEffect, useRef } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IRootState } from '@/app/store';
import { selectCurrentChannel } from '@/features/api/apiSlice';
import { IMessages } from '@/types/Chat';
import useAuth from '@/hooks/useAuth';

interface Props {
  messages: IMessages;
}

const ChatBox = ({ messages }: Props): JSX.Element => {
  const auth = useAuth();
  const currentChannel = useSelector((state: IRootState) => selectCurrentChannel(state));

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

      <InputGroup as="footer" className="p-4 mt-auto">
        <Form.Control placeholder="Введите сообщение..." ref={inputRef} />

        <Button variant="outline-primary">Отправить</Button>
      </InputGroup>
    </div>
  );
};

export default ChatBox;
