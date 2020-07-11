import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/CartActions";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, []);
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItem.length === 0 ? (
            <div>Cart is Empty</div>
          ) : (
            cartItem.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="Product" />
                </div>

                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>{" "}
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItem.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
          {cartItem.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          className="button primary full-width"
          disabled={cartItem.length === 0}
          onClick={checkOutHandler}
        >
          Proceed to Check Out
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
