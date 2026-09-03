import React from "react";
import Button from "./Button";
import Badge from "./Badge";

function ProductCard({ name, price, image, onAddToCart, category, isInCart }) {
  return (
    <article className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">₹{price}</p>
        <div className="product-card-badges">
          <Badge text={category} />
          {isInCart && <Badge text="In Cart" variant="in-cart" />}
        </div>
      </div>
      <div className="product-card-actions">
        <Button
          onClick={onAddToCart}
          value={isInCart ? "Added ✓" : "Add to Cart"}
          variant={isInCart ? "outline" : "primary"}
          disabled={isInCart}
          className="btn-fit"
        />
      </div>
    </article>
  );
}

export default ProductCard;
