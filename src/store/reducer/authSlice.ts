// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id: number;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: string; // Role can be 'admin', 'user', or null if not logged in
  userInfo: UserInfo | null; // User information
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: '',
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ role: string; userInfo: UserInfo }>
    ) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = '';
      state.userInfo = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
