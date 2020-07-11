import React, { useEffect, useState } from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/CartActions";
import CheckOutSteps from "../components/CheckOutSteps";

function PaymentScreen(props) {
  const [paymentMethod, setpaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePayment({ paymentMethod }));
    props.history.push("placeorder");
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setpaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="payment">Paypal</label>
              </div>
            </li>

            <li>
              <button className="button primary" type="submit">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
