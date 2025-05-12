import { useState } from "react";
import {useRouter} from "next/router"

export default function UserForm({ initialValues, onSubmit, mode }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.user) errs.user = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email is required";
    if (!formData.age || isNaN(formData.age)) errs.age = "Valid age is required";
    if (!formData.mobile || formData.mobile.toString().length < 10)
      errs.mobile = "Valid mobile number is required";
    if (!formData.interest || formData.interest.length === 0)
      errs.interest = "At least one interest is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "mobile" ? Number(value) : value,
    }));
  };

  const handleInterests = (e) => {
    const values = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, interest: values }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "edit" ? "Edit User" : "Add User"}</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Name:</label>
        <input name="user" value={formData.user} onChange={handleChange} />
        {errors.user && <p style={{ color: "red" }}>{errors.user}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email:</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Age:</label>
        <input name="age" type="number" value={formData.age} onChange={handleChange} />
        {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Mobile:</label>
        <input name="mobile" value={formData.mobile} onChange={handleChange} />
        {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Interests (comma separated):</label>
        <input
          name="interest"
          value={formData.interest.join(", ")}
          onChange={handleInterests}
        />
        {errors.interest && <p style={{ color: "red" }}>{errors.interest}</p>}
      </div>

      <button style={{ margin: "10px", }} type="submit">{mode === "edit" ? "Update" : "Create"} User</button>
      <button onClick={() => router.back()}>Go Back</button>
    </form>
  );
}
