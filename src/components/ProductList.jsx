import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

function ProductList({ products, onAddToCart, cartItems }) {
  if (products.length === 0) {
    return <EmptyState message="No products found" />;
  }

  return (
    <div className="container">
      <h1 className="product-head">All Products</h1>
      <div className="product-grid">
        {products.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id);

          return (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              isInCart={isInCart}
              onAddToCart={() => onAddToCart(product)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
