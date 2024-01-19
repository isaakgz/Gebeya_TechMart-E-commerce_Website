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
  import { useRegisterMutation } from "../features/userApiSlices/userApiSlices";
  import { setCredentials } from "../features/authSlice/authSlice";
  import { toast } from "react-toastify";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../store";
  import  { useEffect } from "react";
  
  // creating a schema for for input data
  const userSchema = z
  .object({
    name: z
      .string()
      .min(6, { message: "name must be at least 6 charcters" })
      .max(50, { message: "name can not be more than 50 charcters" }),
    email: z.string().email({ message: "invalid email address" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 charcters" }),
    confirmpassword: z.string().min(8, { message: "password doesn't match" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password doesn't match",
    path: ["confirmpassword"],
  });
  
  ///extract the inferred type
  type FormData = z.infer<typeof userSchema>;
  
  function SignUpPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(userSchema) });
  
    
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [registerNewUser, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { search } = useLocation();
    const searchParms = new URLSearchParams(search);
  
    const redirect = searchParms.get("redirect") || "/";
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (data: FormData) => {
        try {
          const { name, email, password } = data;
          const res = await registerNewUser({name, email, password}).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success("Login successful!"); // Add a success toast
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Email already in use"
          );
        }
      };
    return (
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit((data) => submitHandler(data))}>
        <FormGroup className="my-3">
            <FormLabel>Name</FormLabel>
            <FormControl
              {...register("name")}
              id="name"
              name="name"
              type="tsext"
              placeholder="Enter Your Name"
            ></FormControl>
             {errors.name && (
              <p className="text-danger small">{errors.name.message}</p>
            )}
           
          </FormGroup>
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
              <p className="text-danger small">{errors.email.message}</p>
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
              <p className="text-danger small">{errors.password.message}</p>
            )}
          </FormGroup>
          <FormGroup className="my-3">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              {...register("confirmpassword")}
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              placeholder="Confirm  Password"
            ></FormControl>
             {errors.confirmpassword && (
              <p className="text-danger small">{errors.confirmpassword.message}</p>
            )}
            
          </FormGroup>
  
          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            disabled={isLoading}
          >
            Register
          </Button>
          {isLoading && <Loader />}
        </Form>
        <Row className="py-3">
          <Col>
            Alerady have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    );
  }
  
  export default SignUpPage;
  