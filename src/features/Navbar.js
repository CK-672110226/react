import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({ className }) {
  return (
    <header className={className}>
      <Link to="/" className="brand">
        Trendie
      </Link>
      <Link to="/create-product">Create product</Link>
    </header>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;



  