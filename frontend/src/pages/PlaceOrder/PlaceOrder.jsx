import React from "react";
import "./PlaceOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export default function PlaceOrder() {
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              // onChange={onChangeHandler}
              // value={data.firstName}
              type="text"
              placeholder="first-name"
            />
            <input
              required
              name="lastName"
              // onChange={onChangeHandler}
              // value={data.lastName}
              type="text"
              placeholder="last-name"
            />
          </div>
          <input
            required
            name="email"
            // onChange={onChangeHandler}
            // value={data.email}
            type="email"
            placeholder="email-address"
          />
          <input
            required
            name="street"
            // onChange={onChangeHandler}
            // value={data.street}
            type="text"
            placeholder="street"
          />
          <div className="multi-fields">
            <input
              required
              name="city"
              // onChange={onChangeHandler}
              // value={data.city}
              type="text"
              placeholder="city"
            />
            <input
              required
              name="state"
              // onChange={onChangeHandler}
              // value={data.state}
              type="text"
              placeholder="state"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name="zipcode"
              // onChange={onChangeHandler}
              // value={data.zipcode}
              type="text"
              placeholder="zip-code"
            />
            <input
              required
              name="country"
              // onChange={onChangeHandler}
              // value={data.country}
              type="text"
              placeholder="country"
            />
          </div>
          <input
            required
            name="phone"
            // onChange={onChangeHandler}
            // value={data.phone}
            type="number"
            placeholder="phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>cart total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">proceed to Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
}
