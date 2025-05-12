import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserForm from "../../../components/UserForm";
import userService from "../../../services/userService";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (id) {
      userService.getUser(id)
        .then((data) =>
          setInitialValues({
            user: data.user || "",
            email: data.email || "",
            age: data.age || "",
            mobile: data.mobile || "",
            interest: data.interest || [],
          })
        )
        .catch((err) => {
          console.error("Failed to load user", err);
          alert("Unable to load user.");
        });
    }
  }, [id]);

  const handleUpdateUser = async (data) => {
    try {
      await userService.updateUser(id, data);
      router.push("/users");
    } catch (err) {
      console.error("Failed to update user", err);
      alert("Update failed.");
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <UserForm
        initialValues={initialValues}
        onSubmit={handleUpdateUser}
        mode="edit"
      />
    </div>
  );
}
