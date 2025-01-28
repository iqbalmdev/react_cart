import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { calculateRemainingStock, calculateProductSales } from '../utils/calculations';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Button,
  Switch,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductListingPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const products = useSelector((state: RootState) =>
    state.products.products.filter((product) => product.categoryId === categoryId)
  );
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProduct = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      dispatch({ type: 'products/deleteProduct', payload: id });
      alert('Product deleted successfully.');
    }
  };

  const toggleProductStatus = (id: string, status: boolean) => {
    dispatch({
      type: 'products/toggleProductStatus',
      payload: id,
    });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate(`/products/create/${categoryId}`)}
      >
        Add Product
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Remaining Stock</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{calculateRemainingStock(product.id, products, orders)}</TableCell>
                <TableCell>${calculateProductSales(product.id, orders)}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.active}
                    onChange={() => toggleProductStatus(product.id, product.active)}
                    color="primary"
                  />
                  {product.active ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductListingPage;
