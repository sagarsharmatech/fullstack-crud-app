import { useRouter } from "next/router";
import UserForm from "../../components/UserForm";
import userService from "../../services/userService";

export default function AddUser() {
  const router = useRouter();

  const handleAddUser = async (data) => {
    try {
      await userService.addUser(data);
      router.push("/users");
    } catch (err) {
      console.error("Failed to add user", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const initialValues = {
    user: "",
    email: "",
    age: "",
    mobile: "",
    interest: [],
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm
        initialValues={initialValues}
        onSubmit={handleAddUser}
        mode="add"
      />
    </div>
  );
}
