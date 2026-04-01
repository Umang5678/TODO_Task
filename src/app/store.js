import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todoReducer from "../features/todos/todoslice";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    products: productReducer,
  },
});
