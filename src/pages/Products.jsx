import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getproducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../features/products/productSlice";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((s) => s.products.list);
  const status = useSelector((s) => s.products.status);
  const error = useSelector((s) => s.products.error);

  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      alert("Title and price are required");
      return;
    }
    await dispatch(
      addProduct({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        stock: 10,
      }),
    ).unwrap();
    setForm({ title: "", description: "", price: "" });
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      title: p.title,
      description: p.description,
      price: String(p.price),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "", price: "" });
  };

  const onSaveEdit = async (id) => {
    if (!editForm.title || !editForm.price) {
      alert("Title and price are required");
      return;
    }
    await dispatch(
      editProduct({
        id,
        data: {
          title: editForm.title,
          description: editForm.description,
          price: Number(editForm.price),
        },
      }),
    ).unwrap();
    cancelEdit();
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await dispatch(deleteProduct(id)).unwrap();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Product List (Total: {products.length})
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Add Product</Typography>
        <Box
          component="form"
          onSubmit={onAdd}
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            size="small"
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            size="small"
          />
          <TextField
            label="Price"
            value={form.price}
            type="number"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            size="small"
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Paper>

      {status === "loading" ? <Typography>Loading...</Typography> : null}
      {status === "failed" ? (
        <Typography color="error">{error}</Typography>
      ) : null}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <TextField
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    product.title
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <TextField
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      size="small"
                    />
                  ) : (
                    product.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <TextField
                      value={editForm.price}
                      type="number"
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    product.price
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingId === product.id ? (
                    <>
                      <Button
                        size="small"
                        onClick={() => onSaveEdit(product.id)}
                      >
                        Save
                      </Button>
                      <Button size="small" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="small" onClick={() => startEdit(product)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => onDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
