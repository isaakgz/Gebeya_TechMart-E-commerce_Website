import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../features/userApiSlices/userApiSlices";
import { setCredentials } from "../features/authSlice/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import React, { useEffect } from "react";

// creating a schema for for input data
const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

///extract the inferred type
type FormData = z.infer<typeof userSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  const submitHandler = async (data: FormData) => {
    try {
      const { email, password } = data;
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login successful!"); // Add a success toast
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid email or password"
      );
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { search } = useLocation();
  const searchParms = new URLSearchParams(search);

  const redirect = searchParms.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit((data) => submitHandler(data))}>
        <FormGroup className="my-3">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            {...register("email")}
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
          ></FormControl>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </FormGroup>
        <FormGroup className="my-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            {...register("password")}
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
          ></FormControl>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </FormGroup>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
