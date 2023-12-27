import { Card, CardBody, CardImg, CardText } from "react-bootstrap";
import { Link } from "react-router-dom";

//shaping the product object
interface product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

//define props
interface productsProps {
    product:product
}

function Products({product}: productsProps) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`product/${product._id}`}>
        <CardImg src={product.image} variant="top" />
      </Link>
      <CardBody>
        <Link className="nav-link" to={`product/${product._id}`}>
          <Card.Title  as="div">
            <strong>{product.name}</strong>
          </Card.Title> 
        </Link>
      </CardBody>
      <CardText as="h3">${product.price}</CardText>
    </Card>
  );
}

export default Products;
