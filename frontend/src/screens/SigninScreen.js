import React, { useEffect, useState } from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/SigninActions";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      props.history.push(redirect);
    }

    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>{loading && <div>Loading ...</div>}</li>
          <li>{error && <div>{error}.</div>}</li>
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
          <li>
            <button className="button primary" type="submit">
              {" "}
              SignIn
            </button>
          </li>
          <li>New to Amazona?</li>
          <Link
            to={
              redirect === "/" ? "/register" : "/register?redirect=" + redirect
            }
            className="button secondary text-center"
          >
            Create your Amazona Account
          </Link>
        </ul>
      </form>
    </div>
  );
}
export default SigninScreen;
