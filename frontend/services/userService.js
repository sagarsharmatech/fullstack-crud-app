const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const userService = {
  getUsers: async () => {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
  getUser: async (id) => {
    const res = await fetch(`${API_BASE}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },
  addUser: async (data) => {
    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add user");
    return res.json();
  },
  updateUser: async (id, data) => {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },
  deleteUser: async (id) => {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete user");
    return res.json();
  },
};

export default userService;
