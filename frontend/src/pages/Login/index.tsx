import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, FloatingLabel, Form, Image } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import profileImage from '@/assets/images/profile.png';
import useAuth from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';

const LoginPage = (): JSX.Element => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const loginScheme = yup.object({
    username: yup.string().trim().required().default(''),
    password: yup.string().trim().required().default(''),
  });

  const formik = useFormik({
    initialValues: loginScheme.getDefault(),
    validationSchema: loginScheme,

    async onSubmit(formData) {
      const UNAUTHORIZED_STATUS_CODE = 401;

      try {
        const response = await axios.post('/api/v1/login', formData);

        login(response.data);

        navigate('/');
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const errorMessage = error.response?.status === UNAUTHORIZED_STATUS_CODE
            ? 'Неверное имя пользователя или пароль'
            : 'Ошибка сервера';

          setServerError(errorMessage);
          usernameRef.current?.select();
        }
      }
    },
  });

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="w-50">
        <Card.Body className="row p-5">
          <Col className="d-flex justify-content-center align-items-center">
            <Image src={profileImage} alt="Фотография профиля" width="180" height="180" />
          </Col>

          <Col>
            <h1 className="text-center mb-3">Войти</h1>

            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <FloatingLabel label="Ваш ник">
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
                <FloatingLabel label="Пароль">
                  <Form.Control type="password" placeholder="Password" required isInvalid={!!serverError} {...formik.getFieldProps('password')} />
                  <Form.Control.Feedback type="invalid">{serverError}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Button className="w-100" variant="outline-primary" type="submit">
                Войти
              </Button>
            </Form>
          </Col>
        </Card.Body>

        <Card.Footer className="p-4 text-center">
          <span>Нет аккаунта?&nbsp;</span>
          <Link to="/signup">Регистрация</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;
