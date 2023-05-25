import { useContext } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import AuthContext from '../contexts';

const Navigation = () => {
  const { isLogged, logOut } = useContext(AuthContext);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        {isLogged && <Button type="button" className="btn btn-dark btn-primary" onClick={() => logOut()}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Navigation;
