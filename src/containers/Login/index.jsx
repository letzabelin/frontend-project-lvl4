import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Form,
  FloatingLabel,
  Navbar,
  Container,
  Card,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home">Hello</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow">
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Img src="/assets/images/login.jpg" alt="Log in" />
                  </Col>
                  <Col>
                    <Form className="p-5">
                      <h1 className="text-center mb-4">
                        {t('form.signin.title')}
                      </h1>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t('form.signin.labels.nickname')}
                        className="mb-3"
                      >
                        <Form.Control type="text" placeholder="nickname" />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingPassword"
                        label={t('form.common.labels.password')}
                      >
                        <Form.Control type="password" placeholder="Password" />
                      </FloatingLabel>

                      <Button className="w-100 mt-3" variant="outline-primary">
                        {t('form.signin.submitButton')}
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                {t('form.signin.actionQuestion')}{' '}
                <Link to="/signup">{t('form.signin.action')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
