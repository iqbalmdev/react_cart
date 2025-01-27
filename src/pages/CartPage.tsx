import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/reducer/cartSlice';
import { placeOrder } from '../store/reducer/orderSlice';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Cart Items:', cartItems);
    console.log('Products:', products);
  }, [cartItems, products]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && quantity >= 0 && quantity <= product.stock) {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      window.alert('Your cart is empty. Add items to place an order.');
      return;
    }

    // Prepare order data
    const order = {
      id: new Date().toISOString(),
      items: cartItems.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return {
          id: item.id,
          name: product?.name || 'Unknown',
          price: product?.price || 0,
          quantity: item.quantity,
        };
      }),
      total: cartItems.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.id);
        return acc + (product?.price || 0) * item.quantity;
      }, 0),
    };

    // Dispatch placeOrder and clearCart actions
    dispatch(placeOrder(order));
    dispatch(clearCart());

    // Alert for successful order placement
    window.alert('Order placed successfully!');
  };

  const total = cartItems.reduce(
    (acc, item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        return acc + product.price * item.quantity;
      }
      return acc;
    },
    0
  );

  return (
    <Box sx={{ display: 'flex', p: 4 }}>
      <Box sx={{ width: '70%', mr: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Your cart is empty.
          </Typography>
        ) : (
          cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return product ? (
              <Card key={item.id} sx={{ mb: 2, p: 2, boxShadow: 2 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2">Price: ${product.price}</Typography>
                      <Typography variant="body2">Stock: {product.stock}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= product.stock}
                      >
                        +
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ) : null;
          })
        )}
      </Box>
      <Box sx={{ width: '30%', backgroundColor: '#f4f4f4', p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
