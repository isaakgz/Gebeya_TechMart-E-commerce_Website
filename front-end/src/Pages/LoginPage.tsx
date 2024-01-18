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
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

// creating a schema for for input data
const userSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters'" })
    .regex(/[A-Za-z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, "Password must contain at least one digit").regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

///extract the inferred type
type FormData = z.infer<typeof userSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });
  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit((data) => console.log(data))}>
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

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
