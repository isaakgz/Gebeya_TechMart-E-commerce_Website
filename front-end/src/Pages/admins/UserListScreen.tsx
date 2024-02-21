import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDeleteUserMutation, useGetUsersQuery } from "../../features/userApiSlices/userApiSlices";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";

function UserListScreen() {
  const { data: users, isLoading, refetch, isError } = useGetUsersQuery(null);
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User removed");

      } catch (error) {
        toast.error("User not removed");
      }
     
    }
  }

  return (
    <>
    <Meta title="Users" />
      <h1>Users</h1>
      {deleteLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger"> {"internal server Error"} </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id?.toString()}>
                <td>{user._id?.toString()}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash
                      style={{
                        color: "white",
                      }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserListScreen;
