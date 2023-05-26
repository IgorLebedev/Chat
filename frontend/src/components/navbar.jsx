import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import AuthContext from '../contexts/index.jsx';

const Navigation = () => {
  const navigate = useNavigate();
  const { isLogged, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        {isLogged && <Button type="button" className="btn btn-dark btn-primary" onClick={() => handleLogOut()}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Navigation;
