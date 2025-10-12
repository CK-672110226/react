import React, { useState, useEffect } from 'react';
import Product from './Product/StyledProduct'; 
import data from '../app/data.js'; 
import axios from 'axios';
import AddForm from './Product/AddForm.js';

import PropTypes from 'prop-types';

const Home = ({ className }) => {
  let currentProductId = 9; 
  const [products,setProducts] = useState([]);
  const [dataSource, setDataSource] = useState('loading');

  function addProduct(product) {
  const newProduct = { id: ++currentProductId, ...product };
  setProducts([...products, newProduct]);

}

  useEffect(() => {
    async function getProducts() {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://apimocha.com/react-redux-class/products';
        const res = await axios.get(apiUrl);
        // if API returns data use it, otherwise fallback to local data
        if (res && res.data && res.data.length) {
          setProducts(res.data);
          setDataSource('api');
        } else {
          console.warn('API returned no data, falling back to local data');
          setProducts(data);
          setDataSource('fallback');
        }
      } catch (err) {
        // optional: handle error (e.g., set an error state or console.log)
        console.error('Failed to fetch products, using local data as fallback', err.message || err);
        setProducts(data);
        setDataSource('fallback');
      }
    }

    getProducts();
  }, []);

  return (
  <div className={className}>
    <h1>New Products <small style={{fontSize:12, marginLeft:8}}>[{dataSource}]</small></h1>
    {
      products.length > 0 ? (
        <ul className="Home__products">
          {products.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </ul>
      ) : (
        <div>Loading products....</div>
      )
    }
  <AddForm addProduct={addProduct} />
  </div>
  );
};

Home.propTypes = {
  className: PropTypes.string,
};

export default Home;