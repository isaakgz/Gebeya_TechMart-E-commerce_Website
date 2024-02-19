import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../features/productSlice/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomePage() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    keyword: keyword ? keyword : "",
  });

  return (
    <>
      {!keyword ? <ProductCarousel /> : (
        <Link className="btn btn-light  mb-4" to="/">
          Go Back
        </Link>
      )}
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
            {data?.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* Component to display each product */}
                <Products product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data?.pages || 1}
            page={data?.page || 1}
            isAdmin={false}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
}

export default HomePage;
