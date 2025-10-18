import { configureStore } from '@reduxjs/toolkit';
import products from '../features/Product/reducers';

export default configureStore({
  reducer: {
    products,
  },
});
