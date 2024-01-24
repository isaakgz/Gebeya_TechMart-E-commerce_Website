import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { savePaymentMethod } from "../features/cartSlice/cartSlice";

function PaymentPage() {
  const [paymentMethod, setPamentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAdress } = cart;

  useEffect(() => {
    if (!shippingAdress) {
      navigate("/shipping");
    }
  }, [shippingAdress, navigate]);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder")
  };

  return (
    <FormContainer>
      <CheckOutSteps step1={true} step2={true} step3={true} step4={false} />
      <h1 className="text-center"> Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend">Select Payment Method</FormLabel>
          <Col>
            <FormCheck
              className="my-2"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="pamentMethod"
              value="paypal"
              checked
              onChange={(e) => setPamentMethod(e.target.value)}
            ></FormCheck>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
