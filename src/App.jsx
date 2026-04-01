import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/login";
import Products from "./pages/products";
import Todos from "./pages/todos";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
