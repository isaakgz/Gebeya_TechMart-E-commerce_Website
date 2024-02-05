import { Link, useParams } from "react-router-dom";
import { useGetordersDetailsQuery } from "../features/ordersSlice/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ReactNode } from "react";
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

function OrderPage() {
  const { id: orderId } = useParams();

  const {
    data: order,

    isLoading,
    isError,
  } = useGetordersDetailsQuery(orderId || "");

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
  ) : (
    <>
      <h1>Order: {order?._id as ReactNode}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message variant="danger">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item) => (
                    <ListGroupItem key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty as number) * (item.price as number)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order}
              {/*maek as delivered//*/}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
