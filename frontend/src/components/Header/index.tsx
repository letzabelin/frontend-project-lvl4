import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';

const Header = (): JSX.Element => {
  const auth = useAuth();

  const logoutHandler = (): void => {
    auth.logout();
  };

  return (
    <Navbar className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>

        {auth.user && <Button onClick={logoutHandler}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
