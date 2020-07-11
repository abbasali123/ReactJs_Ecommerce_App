import React, { useEffect, useState } from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/SigninActions";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/ProductActions";

function ProductsScreen(props) {
  const [id, setId] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setmodalVisible(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setmodalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    setCategory(product.category);
    setImage(product.image);
    setBrand(product.brand);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,

        description,
      })
    );
  };

  const DeleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Products
        </button>
      </div>

      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>{loadingSave && <div>Loading ...</div>}</li>
              <li>{errorSave && <div>{errorSave}.</div>}</li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Image</label>
                <input
                  type="text"
                  name="Image"
                  id="Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="name">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  id="countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>

              <li>
                <button className="button primary" type="submit">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setmodalVisible(false)}
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => DeleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
