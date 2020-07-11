import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/ProductActions";

import { Link } from "react-router-dom";

function HomeScreen(props) {
  // const [products, setProduct] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, err } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());

    return () => {};
  }, []);
  return loading ? (
    <div>Loading ...</div>
  ) : err ? (
    <div>{err}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={"/product/" + product._id}>
              <img
                className="product-image"
                src={product.image}
                alt="product"
              />
            </Link>

            <div className="product-name">
              <Link to={"/product/" + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-rating">
              {product.rating} ({product.numReviews} reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default HomeScreen;
