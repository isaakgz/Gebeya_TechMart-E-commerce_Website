import { Button, Col, Row, Table } from "react-bootstrap";
import {
  useCreatProductMutation,
  useGetProductsQuery,
} from "../../features/productSlice/productApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

function ProductsListPage() {
  const { data: products, isError, isLoading, refetch } = useGetProductsQuery();
    const [createProduct, {isLoading:loadingCreatProduct}] = useCreatProductMutation();

  const deleteHndler = (id: string) => {
    console.log(id);
  };

  const createProductHandler  = async ()=>{
    if(window.confirm("Are You sure to creat new product?")){
        try {
            await createProduct()
            refetch()
        } catch (error) {
            toast.error("error adding products")
            
        }
    }

  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler} className="btn-sm m-3">
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreatProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">Erorr</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={deleteHndler(product._id)}
                    >
                      <FaTrash  style={{color:"white"}}/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default ProductsListPage;
