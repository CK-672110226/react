import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './features/Product/actions';

import GlobalStyle from './features/GlobalStyle';
import StyledNavbar from './features/StyledNavbar';
import StyledContainer from './features/StyledContainer';
import StyledHome from './features/StyledHome';

import AddForm from './features/Product/AddForm';
import UpdateForm from './features/Product/UpdateForm';

function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // keep remote results separate so we can show bundled data first
  const [remoteProducts, setRemoteProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
        const res = await axios.get(apiUrl);

        if (res && res.data) {
          // Only replace the store products if the store is empty. Otherwise
          // keep showing the bundled data and keep remote data aside.
          if (!products || products.length === 0) {
            if (res.data.length) dispatch(fetchProducts(res.data));
          } else {
            // merge remote results into the existing store (reducer will merge)
            if (res.data.length) dispatch(fetchProducts(res.data));
            setRemoteProducts(res.data);
          }
        }
      } catch (err) {
        // on error keep bundled data in reducer
        console.error('Failed to fetch products, using local data as fallback', err && err.message ? err.message : err);
      }
    }

    getProducts();
  }, [dispatch, products]);

  const handleAddProduct = async ({ name, type, imageURL }) => {
    const newProduct = { name, type, imageURL };
    const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
    try {
      const res = await axios.post(apiUrl, newProduct);
      const created = res && res.data ? res.data : newProduct;
      dispatch(addProduct(created));
    } catch (err) {
      console.error('Failed to add product to API, adding locally', err && err.message ? err.message : err);
      dispatch(addProduct(newProduct));
    }
  };

  const handleUpdateProduct = async (id, updates) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
    try {
      const res = await axios.put(`${apiUrl}/${id}`, updates);
      const updated = res && res.data ? res.data : { id, ...updates };
      dispatch(updateProduct(updated));
    } catch (err) {
      console.error('Failed to update product on API, updating locally', err && err.message ? err.message : err);
      dispatch(updateProduct({ id, ...updates }));
    }
  };

  const handleDeleteProduct = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
    try {
      await axios.delete(`${apiUrl}/${id}`);
      dispatch(deleteProduct({ id }));
    } catch (err) {
      console.error('Failed to delete product on API, deleting locally', err && err.message ? err.message : err);
      dispatch(deleteProduct({ id }));
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledNavbar />
      <StyledContainer>
        {products && products.length > 0 ? (
          <Routes>
            <Route path="/create-product" element={<AddForm addProduct={handleAddProduct} />} />
            <Route path="/update-product/:id" element={<UpdateForm products={products} updateProduct={handleUpdateProduct} deleteProduct={handleDeleteProduct} />} />
            <Route path="/" element={<StyledHome products={products} />} />
          </Routes>
        ) : (
          <div>Loading products....</div>
        )}
      </StyledContainer>
    </>
  );
}

export default App;

