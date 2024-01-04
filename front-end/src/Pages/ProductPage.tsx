import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductsDetailQuery } from "../features/productSlice/productApiSlice";

type ProductId = {
  id: string;
};

function ProductPage() {
  // Extract the product ID from the URL parameters
  const { id: productId } = useParams<ProductId>();

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
        <div>Loading...</div>
      ) : isError ? (
        <div>Could not find product with an ID of {productId}</div>
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
                  <ListGroupItem>
                    <Button
                      type="button"
                      disabled={product?.countInStock === 0}
                      className="btn-block btn-dark my-2"
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
