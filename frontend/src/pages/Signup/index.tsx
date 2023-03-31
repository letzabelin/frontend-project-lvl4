import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import profileImage from '@/assets/images/loginProfileTemplate.png';
import { useAuth } from '@/hooks';

const SignupPage = (): JSX.Element => {
  const [serverError, setServerError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (auth.user) {
      navigate('/', { replace: true });
    }
  }, [auth.user]);

  const signupScheme = yup.object({
    username: yup.string().trim()
      .min(3, t('common.errors.atLeast3AndLess20Characters') as string)
      .max(20, t('common.errors.atLeast3AndLess20Characters') as string)
      .required()
      .default(''),
    password: yup.string().trim()
      .min(6, t('signupPage.form.errors.password.atLeast6Characters') as string)
      .required()
      .default(''),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('signupPage.form.errors.confirmPassword.oneOf') as string)
      .default(''),
  });

  const formik = useFormik({
    initialValues: signupScheme.getDefault(),
    validationSchema: signupScheme,
    validateOnBlur: false,
    validateOnChange: false,

    async onSubmit(formData) {
      const CONFLICT_STATUS_CODE = 409;

      try {
        const response = await axios.post('/api/v1/signup', { username: formData.username, password: formData.password });

        auth.login(response.data);
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const errorMessage = error.response?.status === CONFLICT_STATUS_CODE
            ? t('signupPage.form.errors.userAlreadyExist')
            : t('signupPage.form.errors.server');

          setServerError(errorMessage);
        }
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Card className="w-50 shadow">
        <Card.Body className="row p-5">
          <Col className="d-flex justify-content-center align-items-center">
            <Image src={profileImage} alt={t('signupPage.form.imageAlt') as string} width="180" height="180" />
          </Col>

          <Col>
            <h1 className="text-center mb-3">{t('signupPage.form.title')}</h1>

            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <FloatingLabel label={t('signupPage.form.usernameLabel')}>
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    required
                    isInvalid={!!formik.errors.username}
                    ref={usernameRef}
                    {...formik.getFieldProps('username')}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label={t('signupPage.form.passwordLabel')}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    isInvalid={!!formik.errors.password}
                    {...formik.getFieldProps('password')}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label={t('signupPage.form.confirmPassword')}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    isInvalid={!!(formik.errors.confirmPassword || serverError)}
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">{serverError}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Button className="w-100" variant="outline-primary" type="submit">
                {t('signupPage.form.submitButton')}
              </Button>
            </Form>
          </Col>
        </Card.Body>

        <Card.Footer className="p-4 text-center">
          <span>
            {t('signupPage.form.hasAccount')}
            &nbsp;
          </span>
          <Link to="/login">{t('loginPage.form.title')}</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SignupPage;
