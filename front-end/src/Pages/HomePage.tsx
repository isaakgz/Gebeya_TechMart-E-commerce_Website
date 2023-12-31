import { Col, Row } from "react-bootstrap";
// import products from "../products";
import { useEffect, useState } from "react";
import axios from "axios";
import Products, { Product } from "../components/Products";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  // fetching data from API and updating state using useEffect hook
  useEffect(() => {
    axios
      .get<Product[]>("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error("error fetching data", err));
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            {/* Component to display each product */}
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
