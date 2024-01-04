import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../features/productSlice/productApiSlice";

function HomePage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : isError ? (
        <div>
          <h1>Error Loading Data!</h1>
        </div>
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
