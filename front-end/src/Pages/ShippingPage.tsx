import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { saveShippingAdress } from "../features/cartSlice/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

function ShippingPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAdress } = cart;

  const [address, setAddress] = useState<string>(shippingAdress?.address || "");
  const [city, setCity] = useState<string>(shippingAdress?.city || "");
  const [postalCode, setPostalCode] = useState<string>(
    shippingAdress?.postalCode || ""
  );
  const [country, setCountry] = useState<string>(shippingAdress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(saveShippingAdress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1={true} step2={true} step3={false} step4={false} />
      <h1>Shipping Information</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="adress" className="my-2">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city" className="my-2">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postalcode" className="my-2">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country" className="my-2">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingPage;
