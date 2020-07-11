import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/CartConstants";
import axios from "axios";
import Cookie from "js-cookie";
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/products/" + productId
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItem },
    } = getState();
    Cookie.set("cartItem", JSON.stringify(cartItem));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItem },
  } = getState();
  Cookie.set("cartItem", JSON.stringify(cartItem));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
