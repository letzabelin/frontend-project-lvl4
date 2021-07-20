// @ts-check

import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import {
  Form,
  FloatingLabel,
  Container,
  Card,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import * as Yup from 'yup';

import CommonLayout from '../common/index.jsx';
import routes from '../../api/routes.js';
import { useAuth } from '../../hooks/index.js';

const Signup = () => {
  const { t } = useTranslation();
  const usernameRef = useRef(null);

  const [isSignupFailed, setSignupFailed] = useState(false);
  const { logIn } = useAuth();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('form.signup.prompts.currentLength'))
        .max(20, t('form.signup.prompts.currentLength'))
        .required(t('form.common.prompts.required')),
      password: Yup.string()
        .min(6, t('form.signup.prompts.minimumCharacters'))
        .required(t('form.common.prompts.required')),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password')],
          t('form.signup.prompts.matchPasswords'),
        )
        .required(t('form.common.prompts.required')),
    }),
    onSubmit: async (values) => {
      setSignupFailed(false);

      try {
        const { data } = await axios.post(routes.signupPath(), values);

        localStorage.setItem('userId', JSON.stringify(data));
        logIn();

        history.push('/');
      } catch (err) {
        if (err.isAxiosError && (err.response.status === 401 || err.response.status === 409)) {
          setSignupFailed(true);
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
                        controlId="username"
                        label={t('form.signup.labels.username')}
                        className="mb-3"
                      >
                        <Form.Control
                          ref={usernameRef}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          type="text"
                          placeholder="username"
                          name="username"
                          isInvalid={
                            formik.errors.username && formik.touched.username
                          }
                          autoComplete="off"
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.username}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="password"
                        label={t('form.common.labels.password')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          placeholder="Password"
                          name="password"
                          isInvalid={
                            formik.errors.password && formik.touched.password
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="confirmPassword"
                        label={t('form.signup.labels.confirmPassword')}
                      >
                        <Form.Control
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmPassword}
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          isInvalid={
                            (formik.errors.confirmPassword
                            && formik.touched.confirmPassword)
                            || isSignupFailed
                          }
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.confirmPassword}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t('form.signup.error')}
                        </Form.Control.Feedback>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default Signup;
