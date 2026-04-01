import API from "../../api/axios";

export const fetchProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products/add", data);
export const updateProduct = ({ id, data }) => API.put(`/products/${id}`, data);
export const deleteProductById = (id) => API.delete(`/products/${id}`);
