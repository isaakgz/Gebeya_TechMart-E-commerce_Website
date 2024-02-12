import { Link, useParams } from "react-router-dom";
import {
  useGetordersDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation
} from "../features/ordersSlice/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ReactNode, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

//import paypal buttons
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";

function OrderPage() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetordersDetailsQuery(orderId || "");

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, {isLoading:loadingDeliver}] = useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: erorrPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!erorrPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId, // Fix: Change 'client-id' to 'clientId'
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" }); // Fix: Change value to { state: "pending" }
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [paypal, paypalDispatch, order, erorrPayPal, loadingPayPal]);

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
              {!order?.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={async () => {
                          await payOrder({ orderId: orderId!, details: { payer: {} } });
                          refetch();
                          toast.success("Order is paid");
                        }}
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        Test Pay order
                      </Button>
                      <div>
                        <PayPalButtons
                          style={{
                            layout: "horizontal",
                            color: "gold",
                            shape: "rect",
                            label: "pay",
                          }}
                          createOrder={(_data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: order?.totalPrice?.toString() ?? '',
                                  },
                                },
                              ],
                            }).then((orderId) => {
                              return orderId;
                            });
                          }}
                          onError={(err) => {
                            toast.error(err.toString());
                           
                            
                          }}
                          onApprove={async (data, actions) => {
                            return actions.order?.capture().then(async (details) => {
                              try {
                                await payOrder({orderId: orderId ?? '', details});
                                refetch();
                                toast.success("Order is paid");
                                
                              } catch (error) {
                                toast.error("error in payment");

                                
                              }
                            });
                          }}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              )}
              {loadingDeliver && <Loader />}
              {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                <ListGroupItem>
                  <Button className="btn btn-block"
                    onClick={async () => {
                      await deliverOrder(orderId ?? '');
                      refetch();
                      toast.success("Order is delivered");
                    }}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
