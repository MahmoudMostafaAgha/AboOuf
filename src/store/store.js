import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import counterReducer from '../reducers/counterReducer';


const store = configureStore({
  reducer: {
    products: productsReducer,
    counter: counterReducer,
  }
});

export default store;
