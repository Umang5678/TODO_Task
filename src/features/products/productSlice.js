import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from "./productAPI";

export const getproducts = createAsyncThunk("products/get", async () => {
  const res = await fetchProducts();
  return res.data.products;
});

export const addProduct = createAsyncThunk("products/add", async (payload) => {
  const res = await createProduct(payload);
  return res.data;
});

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, data }) => {
    const res = await updateProduct({ id, data });
    return res.data;
  },
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await deleteProductById(id);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
