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
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../components/Products";

type ProductId = {
  id: string;
};

function ProductPage() {
    // Extract the product ID from the URL parameters
  const { id: productId } = useParams<ProductId>();

  const [product, setProduct] = useState<Partial<Product>>({});

  /// Fetch product details from the server when the component mounts
  useEffect(() => {
    axios
      .get<Product>(`/api/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => console.error("error fetching data", error));
  }, [productId]);

 

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
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
  );
}

export default ProductPage;
