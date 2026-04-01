import React, { useState } from "react";
import { login } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const result = await dispatch(login(form)).unwrap();
      if (result?.token) {
        navigate("/products");
      } else {
        alert("Login succeeded but token not returned by server.");
      }
    } catch (err) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
