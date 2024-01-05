import { Link, useParams, useNavigate } from "react-router-dom";
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
import Rating from "../components/Rating";
import { useGetProductsDetailQuery } from "../features/productSlice/productApiSlice";
import { addToCart } from "../features/cartSlice/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch } from "react-redux";

type ProductId = {
  id: string;
};

function ProductPage() {
  const { id: productId } = useParams<ProductId>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    if (product) {
      // Ensure product is defined before dispatching addToCart
      dispatch(addToCart({ ...product, qty }));
      navigate("/cart")
    }
  };

  // Extract the product ID from the URL parameters

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductsDetailQuery(productId || "");

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          <p>Could not find product with an ID of</p>
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product?.name}</h3>
                </ListGroupItem>

                <ListGroupItem className="mt-2">
                  <Rating
                    text={`${product?.numReviews} reviews`}
                    value={product?.rating ?? 0}
                  />
                </ListGroupItem>
              </ListGroup>
              <hr />
              <ListGroupItem>Price: {product?.price}</ListGroupItem>
              <ListGroupItem>Description: {product?.description}</ListGroupItem>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>{product?.price}</strong>{" "}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {product?.countInStock && product?.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>{" "}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product && product?.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(event) =>
                              setQty(Number(event.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      type="button"
                      disabled={product?.countInStock === 0}
                      className="btn-block btn-dark my-2"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage;
