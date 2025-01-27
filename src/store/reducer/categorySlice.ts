import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: string;
  name: string;
  image: string;
  active: boolean;
  availableStock: number;
  totalSales: number;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      const id = String(state.categories.length + 1);
      
      state.categories.push({ id, ...action.payload });
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) state.categories[index] = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload);
    },
    toggleCategoryStatus: (state, action: PayloadAction<string>) => {
      const category = state.categories.find((cat) => cat.id === action.payload);
      if (category) category.active = !category.active;
    },
  },
});

export const { addCategory, editCategory, deleteCategory, toggleCategoryStatus } =
  categorySlice.actions;
export default categorySlice.reducer;
