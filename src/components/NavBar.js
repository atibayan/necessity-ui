import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import AuthenticatedButton from './AuthenticatedButton'

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Brand-name</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/product/women">WOMEN</Nav.Link>
            <Nav.Link href="/product/men">MEN</Nav.Link>
            <Nav.Link href="/product/kids">KIDS</Nav.Link>
            <Nav.Link href="/all">BROWSE ALL</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Link href="favorites">
            <FontAwesomeIcon icon={faHeart} size="xl" inverse/>
          </Nav.Link>
          <Nav.Link href="#" disabled>
            Favorites
          </Nav.Link>
          <Nav.Link href="cart">
            <FontAwesomeIcon icon={faCartShopping} size="xl" inverse/>
          </Nav.Link>
          <Nav.Link href="#" disabled>
            Cart
          </Nav.Link>
          <AuthenticatedButton />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;