import { useEffect, useState } from "react";
import Link from "next/link";
import userService from "../../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUsers()
      .then(setUsers)
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      const updatedUsers = await userService.getUsers();
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };  

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User List</h1>
      <Link href="/users/add">
        <button>Add New User</button>
      </Link>

      <table border="1" cellPadding="10" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Interests</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.user}</td>
              <td>{user.email}</td>
              <td>{user.interest.join(", ")}</td>
              <td>{user.age}</td>
              <td>{user.mobile}</td>
              <td>
                <Link style={{ marginRight: "10px" }} href={`/users/${user._id}`}>
                  <button>View</button>
                </Link>
                <Link style={{ marginRight: "10px" }} href={`/users/edit/${user._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
