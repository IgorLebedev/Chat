import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts/AuthContext.jsx';

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('navbar.title')}</Navbar.Brand>
        {user && <Button type="button" className="btn btn-dark btn-primary" onClick={() => handleLogOut()}>{t('navbar.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Navigation;
