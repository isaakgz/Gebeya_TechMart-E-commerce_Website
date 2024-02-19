import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../features/cartSlice/cartSlice";
import { CartItem } from "../utils/cartUtils";
import Meta from "../components/Meta";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = async (product: CartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const handleRemoveFromCart =  async (id: CartItem) => {
    dispatch(removeFromCart(id));
  };

  const checkOuttHandler = ()=>{
    navigate("/login?redirect=/shipping")
  }
  return (
    <Row>
      <Meta title="Shopping Cart" />
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}> Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="success">
            Your cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(event) =>
                        addToCartHandler(item, Number(event.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={()=>handleRemoveFromCart(item)}>
                      <FaTrash  />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Sub Total({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-secondary"
                disabled={cartItems.length === 0}
                onClick={()=>checkOuttHandler()}
              >
                Proceed To check Out
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
