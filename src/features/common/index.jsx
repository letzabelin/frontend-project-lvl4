// @ts-check

import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../../hooks/useAuth.js';

const CommonLayout = ({ children }) => {
  const { isSignIn, signOut } = useAuth();
  const { t } = useTranslation();

  const handleClick = () => {
    signOut();
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Hexlet-Chat
            {' '}
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          {isSignIn && (
            <Button onClick={handleClick} variant="outline-primary">
              {t('signoutButton')}
            </Button>
          )}
        </Container>
      </Navbar>
      {children}
    </div>
  );
};

export default CommonLayout;
