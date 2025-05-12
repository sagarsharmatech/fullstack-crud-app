import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      userService.getUser(id)
        .then(setUser)
        .catch(err => console.error("Failed to load user", err));
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Detail</h1>
      <p><strong>Name:</strong> {user.user}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Interests:</strong> {user.interest?.join(", ")}</p>

      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}
