import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Product = ({ item, className }) => {
  // Resolve image source safely. Support three cases:
  // 1) item.imageURL is a relative asset name (e.g. 'shirt.jpg') -> require from assets folder
  // 2) item.imageURL or item.image is a full URL (starts with http) -> use it directly
  // 3) missing image -> use a local placeholder asset
  let productImageSrc = '';
  const remoteImage = item.imageURL || item.image;
  try {
    if (remoteImage && String(remoteImage).startsWith('http')) {
      productImageSrc = remoteImage;
    } else if (remoteImage) {
      // treat as local asset filename
      // require can throw if file not found, so wrap in try/catch
      productImageSrc = require(`../../assets/${remoteImage}`);
    } else {
      productImageSrc = require('../../assets/shirt.jpg');
    }
  } catch (err) {
    // fallback placeholder if require failed
    try {
      productImageSrc = require('../../assets/shirt.jpg');
    } catch (err2) {
      productImageSrc = '';
    }
  }

  return (
    <li className={className || 'Products'}>
      <Link to={`/update-product/${item.id}`}>
        <img className="Products__image" src={productImageSrc} alt={item.name} />
        <div className="Products__name">{item.name}</div>
        <small className="Products__type">{item.type}</small>
      </Link>
    </li>
  );
};

Product.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Product;