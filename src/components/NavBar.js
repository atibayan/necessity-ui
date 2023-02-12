import Container from 'react-bootstrap/Container';
import { Button, Badge, Nav, Navbar } from 'react-bootstrap';
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
            <Button variant="light" className="position-relative"><FontAwesomeIcon icon={faHeart} size="l"/>
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">5</Badge>
            </Button>             
          </Nav.Link>
          <Nav.Link href="cart">
            <Button variant="light" className="position-relative"><FontAwesomeIcon icon={faCartShopping} size="l" />
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">10</Badge>
            </Button>
          </Nav.Link>
          
        </Nav>
        <Nav>
            <AuthenticatedButton />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;