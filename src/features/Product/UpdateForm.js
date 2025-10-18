import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from './actions';

function UpdateForm({ products = [], updateProduct: _u, deleteProduct: _d }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsFromStore = useSelector((state) => state.products) || products;

  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [type, setType] = useState('');

  // when products prop or store is available, prefill the form
  useEffect(() => {
    const list = productsFromStore;
    if (list && list.length > 0) {
      const product = list.find((p) => String(p.id) === String(id));
      if (product) {
        setName(product.name || '');
        setImageURL(product.imageURL || '');
        setType(product.type || '');
      }
    }
  }, [id, productsFromStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = { id: Number(id) || id, name, imageURL, type };
    // prefer dispatching to store
    dispatch(updateProduct(updates));
    navigate('/');
  };

  const handleDelete = async () => {
    dispatch(deleteProduct({ id: Number(id) || id }));
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
