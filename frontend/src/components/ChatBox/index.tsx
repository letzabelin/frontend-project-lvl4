import { useEffect, useRef } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { IMessages } from '@/types/Chat';

interface Props {
  messages: IMessages
}

const ChatBox = ({ messages }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <header className="bg-light p-3 mb-3 shadow-sm small">
        <p className="fw-bold m-0"># general</p>
        <span className="text-muted">0 сообщений</span>
      </header>

      <main className="px-5 overflow-auto">
        <div className="mb-2">
          <span className="fw-bold">admin:&nbsp;</span>
          some message
        </div>
      </main>

      <InputGroup as="footer" className="p-4 mt-auto">
        <Form.Control placeholder="Введите сообщение..." ref={inputRef} />

        <Button variant="outline-primary">Отправить</Button>
      </InputGroup>
    </div>
  );
};

export default ChatBox;
