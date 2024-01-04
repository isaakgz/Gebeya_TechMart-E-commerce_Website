import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../features/productSlice/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomePage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          <p>error fetching products</p>
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* Component to display each product */}
                <Products product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomePage;
