import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ item, className }) => {
  const productImage = require(`../../assets/${item.imageURL}`);

  return (
    <li className={className || 'Products'}>
      <a href={`/update-product/${item.id}`}>
        <img className="Products__image" src={productImage} alt={item.name} />
        <div className="Products__name">{item.name}</div>
        <small className="Products__type">{item.type}</small>
      </a>
    </li>
  );
};

Product.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Product;