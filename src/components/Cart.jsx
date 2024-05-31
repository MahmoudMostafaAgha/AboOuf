import React from 'react';
import { useSelector } from 'react-redux'; 
import '../styles/cart.css';

const Cart = () => {
  const counter = useSelector(state => state.counter.counter); 

  return (
    <div className="cart-container">
      <div className="cart">
        <img src="/cart.svg" alt="cart" />
        {counter > 0 && <div className="counter">{counter}</div>}
      </div>
    </div>
  );
};

export default Cart;
