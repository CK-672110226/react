import React, { useState } from 'react';
import Product from './Product'; 
import data from '../app/data.js'; 
import AddForm from './Product/AddForm.js';

const Home = () => {
  let currentProductId = 9; 
  const [products,setProducts] = useState([]);

  function addProduct(product) {
  const newProduct = { id: ++currentProductId, ...product };
  setProducts([...products, newProduct]);

}

  return (
  <>
    <h1>New Products</h1>
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
  </>
  );
};

export default Home;