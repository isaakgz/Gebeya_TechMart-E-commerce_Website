import { Form, Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";

import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../features/userApiSlices/userApiSlices";
import Meta from "../../components/Meta";

function UserEditScreen() {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId ?? "");

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        await updateUser({ userId: userId ?? "", user: {
                name, email, isAdmin,
                _id: ""
        } });
        toast.success("User Updated");
        navigate("/admin/userlist");
        refetch();
    } catch (error) {
        toast.error("Error updating user");
    }
};

  
  return (
    <>
    <Meta title="Edit User" />
      <Link className="btn btn-light my-3" to="/admin/userlist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {"internal server error"}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-2">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="email" className="my-2">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="isadmin" className="my-2">
              
              <FormCheck
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                />
            </FormGroup>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditScreen;
