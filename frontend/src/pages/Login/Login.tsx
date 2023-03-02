import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, FloatingLabel, Form, Image } from 'react-bootstrap';
import profileImage from '@/assets/profile.png';

const Login = (): JSX.Element => {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="w-50">
        <Card.Body className="row p-5">
          <Col className="d-flex justify-content-center align-items-center">
            <Image src={profileImage} alt="Фотография профиля" width="180" height="180" />
          </Col>

          <Col>
            <h1 className="text-center mb-3">Войти</h1>

            <Form>
              <Form.Group className="mb-3">
                <FloatingLabel label="Ваш ник">
                  <Form.Control type="text" placeholder="name@example.com" required />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label="Пароль">
                  <Form.Control type="password" placeholder="Password" required />
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
          <Link to="/">Регистрация</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
