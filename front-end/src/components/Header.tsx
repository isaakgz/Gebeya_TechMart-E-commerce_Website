import { Nav, Navbar, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
        <Navbar.Brand href="/">Hamus gebya</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cart"><MdShoppingCart/>  Cart</Nav.Link>
            <Nav.Link href="/login"><FaUser/>  Sign in</Nav.Link>
          </Nav>
        
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
