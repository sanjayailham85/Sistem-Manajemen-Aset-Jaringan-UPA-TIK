import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    role: "guest",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized");
        return navigate("/login");
      }

      await axios.post("http://localhost:5000/api/auth/register", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User berhasil dibuat");

      setForm({
        username: "",
        password: "",
        name: "",
        role: "guest",
      });

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
      <h2 className="text-xl font-bold mb-4">Register User</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          className="w-full border p-2"
          required
        />

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          className="w-full border p-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full border p-2"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="guest">Guest</option>
          <option value="operator">Operator</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
