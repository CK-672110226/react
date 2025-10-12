import PropTypes from 'prop-types';

function Navbar({ className }) {
  return (
    <header className={className}>
      <a href="/" className="brand">
        Trendie
      </a>
      <a href="/create-product">Create product</a>
    </header>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;



  