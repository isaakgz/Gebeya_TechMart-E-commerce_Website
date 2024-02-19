import { Link, useParams, useNavigate, Form } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useCreateProductReviewMutation,
  useGetProductsDetailQuery,
} from "../features/productSlice/productApiSlice";
import { addToCart } from "../features/cartSlice/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

type ProductId = {
  id: string;
};

function ProductPage() {
  const { id: productId } = useParams<ProductId>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [creatReview, { isLoading: loadingProductRview }] =
    useCreateProductReviewMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    if (product) {
      // Ensure product is defined before dispatching addToCart
      dispatch(addToCart({
        ...product, qty,
        product: undefined
      }));
      navigate("/cart");
    }
  };

  // Extract the product ID from the URL parameters

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductsDetailQuery(productId || "");

  const submitHandler =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await creatReview({ productId: productId || "", review: {
        rating, comment,
        _id: undefined,
        user: "",
        name: "",
        createdAt: new Date(),
        updatedAt: new Date()
      } }).unwrap(); 
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error( "product already reviewed");
      
    }

  }

  return (
    <>
    <Meta title="Product" />
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          <p>Could not find product with an ID </p>
        </Message>
      ) : (
        <>
        <Meta title={product?.name}  description={product?.description}/>
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
          <Row className="review">
            <Col md={6}>
              <h2>Review</h2>
              {product?.reviews.length === 0 && (
                <Message variant="success">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product?.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text={""} />
                    <p>{review.createdAt.toString()}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}

                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {loadingProductRview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup className = "my-2" controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loadingProductRview}>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="success">
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}

                  
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage;
