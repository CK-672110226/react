import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddForm({ addProduct }) {

  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [type, setType] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'imageURL') {
      setImageURL(value);
    } else if (name === 'type') {
      setType(value);
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();


    addProduct({ name, type, imageURL });
 
    setName('');
    setImageURL('');
    setType('');
  };

  return (
    <>
      <h1>Add Product</h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className=" input-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            name="imageURL"
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={handleInputChange}
          />
        </div>

        <div className=" input-group">
          <label htmlFor="type">Type</label>
          <input
            name="type"
            type="text"
            id="type"
            value={type}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Add product</button>
      </form>
    </>
  );
}


AddForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default AddForm;
