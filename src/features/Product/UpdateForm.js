import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateForm({ products = [], updateProduct, deleteProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [type, setType] = useState('');

  // when products prop is available, prefill the form
  useEffect(() => {
    if (products && products.length > 0) {
      const product = products.find((p) => String(p.id) === String(id));
      if (product) {
        setName(product.name || '');
        setImageURL(product.imageURL || '');
        setType(product.type || '');
      }
    }
  }, [id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = { name, imageURL, type };
    if (updateProduct) {
      await updateProduct(id, updates);
    }
    navigate('/');
  };

  const handleDelete = async () => {
    if (deleteProduct) {
      await deleteProduct(id);
    }
    navigate('/');
  };

  return (
    <>
      <h1>Update Product</h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className=" input-group">
          <label htmlFor="imageURL">Image URL</label>
          <input name="imageURL" type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </div>

        <div className=" input-group">
          <label htmlFor="type">Type</label>
          <input name="type" type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
        </div>

        <button type="button" className="UpdateForm__delete-button" onClick={handleDelete}>
          Delete restaurant
        </button>
        <button type="submit">Update product</button>
      </form>
    </>
  );
}

export default UpdateForm;
