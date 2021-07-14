import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MessageForm = () => {
  const { t } = useTranslation();

  return (
    <InputGroup className="mb-3">
      <FormControl placeholder={t('messages.placeholder')} />
      <Button variant="outline-success">{t('messages.button')}</Button>
    </InputGroup>
  );
};

export default MessageForm;
