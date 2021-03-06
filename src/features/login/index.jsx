// @ts-check

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import routes from '../../api/routes.js';
import CommonLayout from '../common/index.jsx';
import useAuth from '../../hooks/useAuth.js';

const Login = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const usernameRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();

        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          usernameRef.current.select();
          return;
        }

        throw err;
      }
    },
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <CommonLayout>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow">
              <Card.Body>
                <Row>
                  <Col
                    xs={12}
                    lg={6}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img
                      width="300"
                      src="/assets/images/login.png"
                      alt={t('form.login.title')}
                      className="rounded-circle"
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form onSubmit={formik.handleSubmit} className="p-5">
                      <h1 className="text-center mb-4">
                        {t('form.login.title')}
                      </h1>
                      <FloatingLabel
                        controlId="username"
                        label={t('form.login.labels.username')}
                        className="mb-3"
                      >
                        <Form.Control
                          isInvalid={isAuthFailed}
                          ref={usernameRef}
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          type="text"
                          placeholder="username"
                          name="username"
                          required
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="password"
                        label={t('form.common.labels.password')}
                      >
                        <Form.Control
                          isInvalid={isAuthFailed}
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="Password"
                          name="password"
                          required
                        />
                        { isAuthFailed && <Form.Control.Feedback type="invalid">{t('form.login.error')}</Form.Control.Feedback>}
                      </FloatingLabel>

                      <Button
                        type="submit"
                        className="w-100 mt-3"
                        variant="outline-primary"
                      >
                        {t('form.login.submitButton')}
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                {t('form.login.question')}
                {' '}
                <Link to="/signup">{t('form.signup.title')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default Login;
