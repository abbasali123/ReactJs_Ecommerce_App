import React, { useEffect, useState } from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/ProductActions";

function ProductScreen(props) {
  const [qty, setqty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []);

  const handleAddtoCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-results">
        <Link to="/">Back to Results</Link>
      </div>
      {loading ? (
        <div>Loading ...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product"></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                <p> {product.rating}</p>
              </li>
              <li>
                <p>{product.numReviews} Customer reviews</p>
              </li>
              <li>
                <p>Price:${product.price}</p>
              </li>
              <li>
                <p> Description:</p>
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>
                <b>Price: {product.price}</b>
              </li>
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </li>
              <li>
                Qty:
                <select
                  value={qty}
                  onChange={(e) => {
                    setqty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 ? (
                  <button className="button primary" onClick={handleAddtoCart}>
                    {" "}
                    Add to Cart
                  </button>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
