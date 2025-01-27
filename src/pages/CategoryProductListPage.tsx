import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/reducer/cartSlice'; // Redux action to add items to the cart
import { Card, CardMedia, CardContent, Button, Typography, Stack } from '@mui/material';



interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    active: boolean;
    description:string;
    image:string
  }
const CategoryProductListPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const products = useSelector((state: RootState) =>
    state.products.products.filter((product) => product.categoryId === categoryId && product.active)
  );

  const dispatch = useDispatch();

  // Local state for tracking product quantity selection
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  // UseEffect to monitor the quantity state (for debugging purposes)
  useEffect(() => {
    console.log(quantity); // This will help you monitor quantity changes
  }, [quantity]);

  const handleAddToCart = (product: Product) => {
    const selectedQuantity = quantity[product.id] || 0;
    // Only add to cart if quantity is greater than 0 and within stock limit
    if (selectedQuantity > 0 && selectedQuantity <= product.stock) {
      dispatch(addToCart({ id: product.id, name: product.name, price: product.price, quantity: selectedQuantity }));
    }
  };

  const handleQuantityChange = (productId: string, action: 'increment' | 'decrement') => {
    setQuantity((prev) => {
      const newQuantity = prev[productId] || 0;
      const productStock = products.find(p => p.id === productId)?.stock || 0;

      if (action === 'increment' && newQuantity < productStock) {
        return { ...prev, [productId]: newQuantity + 1 };
      }
      if (action === 'decrement' && newQuantity > 0) {
        return { ...prev, [productId]: newQuantity - 1 };
      }
      return prev;
    });
  };

  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Products in Category
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
        {products.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No products available in this category.
          </Typography>
        ) : (
          products.filter((pr)=>pr.active === true).map((product) => (
            <Card key={product.id} sx={{ width: 200, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 140 }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ${product.price}
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(product.id, 'decrement')}
                    disabled={quantity[product.id] <= 0}
                  >
                    -
                  </Button>
                  <Typography>{quantity[product.id] || 0}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(product.id, 'increment')}
                    disabled={quantity[product.id] >= product.stock}
                  >
                    +
                  </Button>
                </Stack>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(product)}
                  disabled={quantity[product.id] <= 0 || quantity[product.id] > product.stock}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default CategoryProductListPage;
