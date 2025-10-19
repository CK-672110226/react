import { createReducer } from '@reduxjs/toolkit';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './actions';
import data from '../../app/data';

let currentProductId = 9;

export default createReducer(data, {
  [fetchProducts]: (state, action) => {
    // README behavior: replace the whole products array with the fetched payload
    return action.payload;
  },
  [addProduct]: (state, action) => {
    state.unshift({ id: ++currentProductId, ...action.payload });
  },
  [updateProduct]: (state, action) => {
    const productIndex = state.findIndex((product) => product.id === action.payload.id);
    if (productIndex !== -1) {
      state[productIndex] = action.payload;
    }
  },
  [deleteProduct]: (state, action) => {
    const productIndex = state.findIndex((product) => product.id === action.payload.id);
    if (productIndex !== -1) {
      state.splice(productIndex, 1);
    }
  },
});
