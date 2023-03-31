import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';

const Header = (): JSX.Element => {
  const auth = useAuth();
  const { t } = useTranslation();

  const logoutHandler = (): void => {
    auth.logout();
  };

  return (
    <Navbar className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('common.header.logo')}</Navbar.Brand>

        {auth.user && <Button onClick={logoutHandler}>{t('common.header.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
