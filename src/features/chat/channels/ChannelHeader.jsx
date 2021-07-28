// @ts-check

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AddChannelModal from '../../modals/AddChannelModal.jsx';

const ChannelHeader = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const onShow = () => {
    setShow(true);
  };

  const onHide = () => {
    setShow(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100 mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <Button
          onClick={onShow}
          variant="light"
          className="btn-group-vertical p-0 text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <AddChannelModal show={show} onHide={onHide} />
    </>
  );
};

export default ChannelHeader;
