import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const CommonLayout = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <Navbar className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home">Hello</Navbar.Brand>
      </Container>
    </Navbar>
    {children}
  </div>
);

export default CommonLayout;
