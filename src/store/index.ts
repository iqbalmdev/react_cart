import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage or sessionStorage
import logger from 'redux-logger'; // Import redux-logger

import { CartReducer, CategoryReducer, OrderReducer, ProductReducer, AuthReducer } from './reducer';

// Persist configuration for the `auth` reducer
const persistConfig = {
  key: 'auth', // Ensure this matches your reducer key
  storage, // Use localStorage for persistence
  whitelist: ['isAuthenticated', 'userInfo', 'userRole'], // State slices to persist
};

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);


// Wrap auth reducer with persistReducer

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Correctly wrapped reducer
    cart: CartReducer,
    categories: CategoryReducer,
    orders: OrderReducer,
    products: ProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in redux-persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(logger), // Add logger middleware
  devTools: true, // Enable Redux DevTools
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store); // Create a persistor object

export default store;
