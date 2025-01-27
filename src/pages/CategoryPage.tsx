import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CategoryListPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCategory = (id: string) => {
    const hasProducts = products.some((product) => product.categoryId === id);
    if (hasProducts) {
      alert("Cannot delete category with existing products.");
      return;
    }
    dispatch({ type: "categories/deleteCategory", payload: id });
  };

  const handleToggleStatus = (id: string) => {
    dispatch({ type: "categories/toggleCategoryStatus", payload: id });
  };

  // Helper function to calculate available stock for a category
  const calculateAvailableStock = (categoryId: string) => {
    // Filter products belonging to the category
    const categoryProducts = products.filter((product) => product.categoryId === categoryId);
  
    // Calculate total stock of the category
    const totalStock = categoryProducts.reduce((sum, product) => sum + product.stock, 0);
  
    // Calculate total ordered quantity for the category
    const totalOrdered = cartItems
      .filter((item) => {
        const product = products.find((product) => product.id === item.id);
        return product && product.categoryId === categoryId;
      })
      .reduce((sum, item) => sum + item.quantity, 0);
  
    // Remaining stock is total stock minus total ordered quantity
    return totalStock - totalOrdered;
  };
  

  // Helper function to calculate total sales amount for a category
  const calculateTotalSales = (categoryId: string) => {
    return cartItems
      .filter((item) => {
        const product = products.find((product) => product.id === item.id);
        return product && product.categoryId === categoryId;
      })
      .reduce((totalSales, item) => {
        const product = products.find((product) => product.id === item.id);
        return product ? totalSales + product.price * item.quantity : totalSales;
      }, 0);
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" textAlign="center" sx={{ p: 2 }}>
        Manage Categories
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
        onClick={() => navigate("/categories/create")}
      >
        Create Category
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Available Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Sales Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </TableCell>
              <TableCell
                onClick={() => navigate(`/products/${category.id}`)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {category.name}
              </TableCell>
              <TableCell>{calculateAvailableStock(category.id)}</TableCell>
              <TableCell>
                <Switch
                  checked={category.active}
                  onChange={() => handleToggleStatus(category.id)}
                />
              </TableCell>
              <TableCell>${calculateTotalSales(category.id).toFixed(2)}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/categories/edit/${category.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteCategory(category.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryListPage;
