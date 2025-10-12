import React from 'react';
import PropTypes from 'prop-types';

function Container({ children, className }) {
  return <main className={className}>{children}</main>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
