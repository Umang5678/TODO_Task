import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);

      // For dummyjson, /users/add does not return a token; login after registration.
      try {
        const loginResponse = await loginUser({
          username: data.username,
          password: data.password,
        });
        return loginResponse.data;
      } catch {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      const token =
        action.payload?.token || action.payload?.accessToken || null;
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      const token =
        action.payload?.token || action.payload?.accessToken || null;
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload || action.error.message;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload || action.error.message;
    });
  },
});

export default authSlice.reducer;
