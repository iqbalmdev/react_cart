import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { calculateAvailableStock, calculateTotalSales } from '../utils/calculations';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryListPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const products = useSelector((state: RootState) => state.products.products);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCategory = (id: string) => {
    const hasProducts = products.some((product) => product.categoryId === id);
    if (hasProducts) {
      alert('Cannot delete a category with existing products.');
      return;
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      dispatch({ type: 'categories/deleteCategory', payload: id });
      alert('Category deleted successfully.');
    }
  };

  const toggleCategoryStatus = (id: string, status: boolean) => {
    dispatch({
      type: 'categories/toggleCategoryStatus',
      payload: id,
    });
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
        onClick={() => navigate('/categories/create')}
      >
        Create Category
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Available Stock</TableCell>
            <TableCell>Total Sales</TableCell>
            <TableCell>Status</TableCell>
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
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell
                onClick={() => navigate(`/products/${category.id}`)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {category.name}
              </TableCell>
              <TableCell>{calculateAvailableStock(category.id, products, orders)}</TableCell>
              <TableCell>${calculateTotalSales(category.id, products, orders)}</TableCell>
              <TableCell>
                <Switch
                  checked={category.active}
                  onChange={() => toggleCategoryStatus(category.id, category.active)}
                  color="primary"
                />
                {category.active ? 'Active' : 'Inactive'}
              </TableCell>
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
