import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import { deleteProduct, toggleProductStatus } from "../store/reducer/productSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProductListingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  // Get category name and products based on categoryId
  const category = useSelector((state: RootState) =>
    state.categories.categories.find((cat) => cat.id === categoryId)
  );
  const products = useSelector((state: RootState) =>
    state.products.products.filter((prod) => prod.categoryId === categoryId)
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate amount sold for a product
  const calculateAmountSold = (productId: string) => {
    const productCartItems = cartItems.filter((item) => item.id === productId);
    return productCartItems.reduce((total, item) => total * item.quantity, 0);
  };

  // Handle Edit Product
  const handleEditProduct = (productId: string) => {
    navigate(`/products/${categoryId}/edit/${productId}`);
  };

  // Handle Delete Product
  const handleDeleteProduct = (productId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(productId));
    }
  };

  // Handle Toggle Product Status (Active/Inactive)
  const handleToggleStatus = (productId: string) => {
    dispatch(toggleProductStatus(productId));
  };

  // Navigate to Create Product page for this category
  const handleCreateProduct = () => {
    navigate(`/products/create/${categoryId}`);
  };

  if (!category) {
    return <Typography variant="h6">Category not found.</Typography>;
  }

  return (
    <Box p={4}>
      {/* Display Category Name as Heading */}
      <Typography variant="h4" gutterBottom>
        {category.name}
      </Typography>

      {/* Create Product Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateProduct}
        sx={{ mb: 2 }}
      >
        Create Product
      </Button>

      {/* Product Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Remaining Stock</TableCell>
              <TableCell>Amount Sold</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const amountSold = calculateAmountSold(product.id);
              const remainingStock = product.stock - amountSold;

              return (
                <TableRow key={product.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{remainingStock}</TableCell>
                  <TableCell>{amountSold}</TableCell>
                  <TableCell>{product.active ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditProduct(product.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                      <Delete />
                    </IconButton>
                    <Button onClick={() => handleToggleStatus(product.id)}>
                      {product.active ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductListingPage;
