// @ts-check

import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Form,
  FloatingLabel,
  Container,
  Card,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import { CommonLayout } from '../../components/index.js';

const Signup = () => {
  const { t } = useTranslation();
  const usernameRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
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
                      src="/assets/images/signup.gif"
                      alt={t('form.signup.title')}
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form onSubmit={formik.handleSubmit} className="p-5">
                      <h1 className="text-center mb-4">
                        {t('form.signup.title')}
                      </h1>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t('form.signup.labels.username')}
                        className="mb-3"
                      >
                        <Form.Control
                          ref={usernameRef}
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          type="text"
                          placeholder="username"
                          name="username"
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingPassword"
                        label={t('form.common.labels.password')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="Password"
                          name="password"
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingPassword"
                        label={t('form.signup.labels.confirmPassword')}
                      >
                        <Form.Control
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                          placeholder="Confirm Password"
                          name="confirmPassword"
                        />
                      </FloatingLabel>

                      <Button
                        type="submit"
                        className="w-100 mt-3"
                        variant="outline-primary"
                      >
                        {t('form.signup.submitButton')}
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                {t('form.signup.question')}
                {' '}
                <Link to="/signin">{t('form.signin.title')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default Signup;
