import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (auth.user) {
      navigate('/', { replace: true });
    }
  }, [auth.user]);

  const signupScheme = yup.object({
    username: yup.string().trim().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов')
      .required()
      .default(''),
    password: yup.string().trim().min(6, 'Не менее 6 символов').required()
      .default(''),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать').default(''),
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
          const errorMessage = error.response?.status === CONFLICT_STATUS_CODE ? 'Такой пользователь уже существует' : 'Ошибка сервера';

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
            <Image src={profileImage} alt="Фотография профиля" width="180" height="180" />
          </Col>

          <Col>
            <h1 className="text-center mb-3">Регистрация</h1>

            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <FloatingLabel label="Имя пользователя">
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
                <FloatingLabel label="Пароль">
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
                <FloatingLabel label="Подтвердите пароль">
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
                Зарегистрироваться
              </Button>
            </Form>
          </Col>
        </Card.Body>

        <Card.Footer className="p-4 text-center">
          <span>Есть аккаунт?&nbsp;</span>
          <Link to="/login">Войти</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SignupPage;
