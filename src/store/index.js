import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';

// In the future there as option to add more slices to the store.
const store = configureStore({
  reducer: { auth: authReducer },
});

export default store;