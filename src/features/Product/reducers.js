import { createReducer } from '@reduxjs/toolkit';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './actions';
import data from '../../app/data';

let currentProductId = 9;

export default createReducer(data, {
  [fetchProducts]: (state, action) => {
    // Merge incoming products with existing state instead of replacing.
    // For each incoming product: if id matches an existing product, update it;
    // otherwise add it (to the front to keep newest first like addProduct).
    const incoming = Array.isArray(action.payload) ? action.payload : [];

    // Map existing products by stringified id for stable comparisons
    const existingIndexById = state.reduce((acc, p, idx) => {
      try {
        acc[String(p.id)] = idx;
      } catch (e) {
        // ignore
      }
      return acc;
    }, {});

    incoming.forEach((item) => {
      const idKey = String(item.id);
      if (idKey in existingIndexById) {
        // update the existing product in-place
        const idx = existingIndexById[idKey];
        state[idx] = { ...state[idx], ...item, id: state[idx].id };
      } else {
        // new product: add to front to keep newest-first ordering
        state.unshift(item);
      }
    });

    // ensure currentProductId won't collide with any numeric ids we received
    try {
      const numericIds = state.map((p) => Number(p.id)).filter((n) => !Number.isNaN(n));
      if (numericIds.length) {
        const maxId = Math.max(...numericIds);
        if (maxId > currentProductId) currentProductId = maxId;
      }
    } catch (e) {
      // ignore
    }
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
