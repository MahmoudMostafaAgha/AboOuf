import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../API/apiService';

export const getProducts = createAsyncThunk('products/getProducts', async (page) => {
  const products = await fetchProducts(page);
  return products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: ''
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
