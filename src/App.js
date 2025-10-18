import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import GlobalStyle from './features/GlobalStyle';
import StyledNavbar from './features/StyledNavbar';
import StyledContainer from './features/StyledContainer';
import StyledHome from './features/StyledHome';

import AddForm from './features/Product/AddForm';
import UpdateForm from './features/Product/UpdateForm';
import data from './app/data';

function App() {
  const [products, setProducts] = useState([]);
  const [dataSource, setDataSource] = useState('loading');

  useEffect(() => {
    async function getProducts() {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
        const res = await axios.get(apiUrl);

        if (res && res.data && res.data.length) {
          setProducts(res.data);
          setDataSource('api');
        } else {
          setProducts(data);
          setDataSource('fallback');
        }
      } catch (err) {
        console.error('Failed to fetch products, using local data as fallback', err && err.message ? err.message : err);
        setProducts(data);
        setDataSource('fallback');
      }
    }

    getProducts();
  }, []);

  const addProduct = async ({ name, type, imageURL }) => {
    const newProduct = { id: Date.now().toString(), name, type, imageURL };
    const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
    try {
      // try to persist to API
      const res = await axios.post(apiUrl, newProduct);
      const created = res && res.data ? res.data : newProduct;
      setProducts((prev) => [created, ...prev]);
      setDataSource('api');
    } catch (err) {
      // fallback to local state
      console.error('Failed to add product to API, adding locally', err && err.message ? err.message : err);
      setProducts((prev) => [newProduct, ...prev]);
      setDataSource('fallback');
    }
  };

  const updateProduct = async (id, updates) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
    try {
      const res = await axios.put(`${apiUrl}/${id}`, updates);
      const updated = res && res.data ? res.data : { id, ...updates };
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setDataSource('api');
    } catch (err) {
      console.error('Failed to update product on API, updating locally', err && err.message ? err.message : err);
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
      setDataSource('fallback');
    }
  };

  const deleteProduct = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDataSource('api');
    } catch (err) {
      console.error('Failed to delete product on API, deleting locally', err && err.message ? err.message : err);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDataSource('fallback');
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledNavbar />
      <StyledContainer>
        {products.length > 0 ? (
          <Routes>
            <Route path="/create-product" element={<AddForm addProduct={addProduct} />} />
            <Route path="/update-product/:id" element={<UpdateForm products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
            <Route path="/" element={<StyledHome products={products} dataSource={dataSource} />} />
          </Routes>
        ) : (
          <div>Loading products....</div>
        )}
      </StyledContainer>
    </>
  );
}

export default App;

