import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="logo" />
            Gebeya
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <MdShoppingCart /> Cart
              </Nav.Link>

              <Nav.Link as={Link} to="/login">
                <FaUser /> Sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
