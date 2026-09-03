import React from "react";
import CartItem from "./CartItem";
import Button from "./Button";
import EmptyState from "./EmptyState";

function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  maxQty,
  totalQty,
  onClear,
  discountCode,
  onDiscountCodeChange,
}) {

  if (cartItems.length === 0) {
    return (
      <section id="cart" className="cart-section section">
        <div className="container">
          <EmptyState message="Your cart is empty" />
        </div>
      </section>
    );
  }
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount =
    discountCode.toUpperCase() === "SAVE10"
      ? total * 0.1
      : discountCode.toUpperCase() === "SAVE20"
        ? total * 0.2
        : 0;

  const finalTotal = total - discount;

  return (
    <section id="cart" className="cart-section section">
      <div className="container cart-block">
        <div className="cart-header">
          <h2 className="cart-title">Cart</h2>
          <span className="cart-count-badge">{totalQty}</span>
        </div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
            onRemove={() => onRemove(item.id)}
            isMaxQty={item.quantity >= maxQty}
          />
        ))}
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          {discount > 0 && (
            <div className="cart-summary-row discount">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="cart-summary-row total">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
          <div className="discount-input-wrapper">
            <input
              type="text"
              value={discountCode}
              onChange={onDiscountCodeChange}
              placeholder="Discount code (SAVE10, SAVE20)"
              className="discount-input"
            />
          </div>
          <Button onClick={onClear} value="Clear Cart" variant="danger" className="btn-fit" />
        </div>
      </div>
    </section>
  );
}

export default Cart;
