import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  ProductListReducers,
  ProductDetailsReducers,
  ProductSaveReducers,
  ProductDeleteReducers,
} from "./reducers/ProductReducers";
import Cookie from "js-cookie";
import thunk from "redux-thunk";
import { cartReducers } from "./reducers/CartReducers";
import {
  userSignInReducers,
  userRegisterReducer,
} from "./reducers/UserReducers";

const cartItem = Cookie.getJSON("cartItem") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {
  cart: { cartItem, shipping: {}, payment: {} },
  userSignin: { userInfo },
};

const reducer = combineReducers({
  productList: ProductListReducers,
  productDetails: ProductDetailsReducers,
  cart: cartReducers,
  userSignin: userSignInReducers,
  userRegister: userRegisterReducer,
  productSave: ProductSaveReducers,
  productDelete: ProductDeleteReducers,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
