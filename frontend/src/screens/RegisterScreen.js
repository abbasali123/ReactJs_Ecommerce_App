import React, { useEffect, useState } from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/SigninActions";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>{loading && <div>Loading ...</div>}</li>
          <li>{error && <div>{error}</div>}</li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li htmlFor="password">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li htmlFor="repassword">
            <label>RePassword</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button className="button primary" type="submit">
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <Link
              to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect}
              className="button secondary text-center"
            >
              Create your Amazona Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
