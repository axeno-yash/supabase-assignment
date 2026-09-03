import React from "react";
import Button from "./Button";

function CartItem({ name, price, quantity, onIncrease, onDecrease, onRemove, isMaxQty }) {
  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <h3 className="cart-item-name">{name}</h3>
        <p className="cart-item-price">₹{price}</p>
      </div>
      <div className="cart-item-quantity">
        <Button onClick={onDecrease} value="-" className="quantity-btn" />
        <span className="quantity-value">{quantity}</span>
        <Button onClick={onIncrease} value="+" disabled={isMaxQty} className="quantity-btn" />
        <span className="cart-item-subtotal">Subtotal: ₹{price * quantity}</span>
      </div>
      <div className="cart-item-remove">
        <Button onClick={onRemove} value="Remove" variant="danger" className="btn-sm" />
      </div>
    </div>
  );
}

export default CartItem;
