import { Nav, Badge, Navbar, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store"
import { LinkContainer } from "react-router-bootstrap";

function Header() {

  const {cartItems} = useSelector((state:RootState)=>state.cart)
  const {userInfo} = useSelector((state:RootState)=>state.auth)

  const logoutHandler = ()=>{
    console.log("lofhjf")

  }
  

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

                {
                  cartItems.length > 0 && (
                    <Badge pill bg="success" style={{marginLeft : "5px"}}>
                      {cartItems.reduce((acc , item)=>acc + item.qty, 0)}

                    </Badge>
                  )
                }
              </Nav.Link>
              {userInfo ? (<NavDropdown title = {userInfo.name} id="userName">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={()=>logoutHandler()}>Logout</NavDropdown.Item>
              </NavDropdown >) : ( <Nav.Link as={Link} to="/login">
                <FaUser /> Sign In
              </Nav.Link>)}

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
