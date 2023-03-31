import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, FloatingLabel, Form, Image } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import profileImage from '@/assets/images/loginProfileTemplate.png';
import { useAuth } from '@/hooks';

const LoginPage = (): JSX.Element => {
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

  const loginScheme = yup.object({
    username: yup.string().trim().required().default(''),
    password: yup.string().trim().required().default(''),
  });

  const formik = useFormik({
    initialValues: loginScheme.getDefault(),
    validationSchema: loginScheme,
    validateOnBlur: false,
    validateOnChange: false,

    async onSubmit(formData) {
      const UNAUTHORIZED_STATUS_CODE = 401;

      try {
        const response = await axios.post('/api/v1/login', loginScheme.cast(formData));

        auth.login(response.data);
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const errorMessage = error.response?.status === UNAUTHORIZED_STATUS_CODE
            ? t('loginPage.form.errors.invalidUsernameOrPassword')
            : t('loginPage.form.errors.server');

          setServerError(errorMessage);
          usernameRef.current?.select();
        }
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Card className="w-50 shadow">
        <Card.Body className="row p-5">
          <Col className="d-flex justify-content-center align-items-center">
            <Image src={profileImage} alt={t('loginPage.form.imageAlt') as string} width="180" height="180" />
          </Col>

          <Col>
            <h1 className="text-center mb-3">{t('loginPage.form.title')}</h1>

            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <FloatingLabel label={t('loginPage.form.usernameLabel')}>
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    required
                    isInvalid={!!serverError}
                    ref={usernameRef}
                    {...formik.getFieldProps('username')}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label={t('loginPage.form.passwordLabel')}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    isInvalid={!!serverError}
                    {...formik.getFieldProps('password')}
                  />
                  <Form.Control.Feedback type="invalid">{serverError}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Button className="w-100" variant="outline-primary" type="submit">
                {t('loginPage.form.submitButton')}
              </Button>
            </Form>
          </Col>
        </Card.Body>

        <Card.Footer className="p-4 text-center">
          <span>
            {t('loginPage.form.noAccount')}
            &nbsp;
          </span>
          <Link to="/signup">{t('signupPage.form.title')}</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
