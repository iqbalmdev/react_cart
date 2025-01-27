import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  active: boolean;
  description:string;
  image:string
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const id = String(state.products.length + 1);
      state.products.push({ id, ...action.payload });
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((prod) => prod.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((prod) => prod.id !== action.payload);
    },
    toggleProductStatus: (state, action: PayloadAction<string>) => {
      const product = state.products.find((prod) => prod.id === action.payload);
      if (product) product.active = !product.active;
    },
  },
});

export const { addProduct, editProduct, deleteProduct, toggleProductStatus } =
  productSlice.actions;
export default productSlice.reducer;
