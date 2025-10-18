import React from 'react';
import Product from './Product/StyledProduct';
import PropTypes from 'prop-types';

const Home = ({ className, products, dataSource }) => {
  return (
    <div className={className}>
      <h1>New Products <small style={{fontSize:12, marginLeft:8}}>[{dataSource}]</small></h1>
      {
        products && products.length > 0 ? (
          <ul className="Home__products">
            {products.map((product) => (
              <Product key={product.id} item={product} />
            ))}
          </ul>
        ) : (
          <div>Loading products....</div>
        )
      }
    </div>
  );
};

Home.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
  dataSource: PropTypes.string,
};

export default Home;