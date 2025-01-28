import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the Order interface
export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;