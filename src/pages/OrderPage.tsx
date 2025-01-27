import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';

const OrderPage: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No orders placed yet.
        </Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 2, p: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Total: ${order.total}
              </Typography>
              <Stack spacing={1}>
                {order.items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      {item.name} (x{item.quantity})
                    </Typography>
                    <Typography variant="body2">
                      ${item.price} each
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default OrderPage;
