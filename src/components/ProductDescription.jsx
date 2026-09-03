function ProductDescription() {
  return (
    <section id="product-description" className="product-description container">
      <div className="product-description-inner">
        <h1 className="product-description-head">Product Description</h1>
        <h2 className="product-description-title">
          Everything you need, all in one place.
        </h2>
        <p className="product-description-text">
          Explore our collection of carefully selected products designed to make
          everyday life a little easier. From practical essentials to simple
          lifestyle upgrades, discover useful products at prices that make
          sense.
        </p>
      </div>
      <div className="product-description-img">
        <img className="img"
          src="/images/products/heroImg.jpg"
          fetchPriority="high"
          alt="hero-img"
          width={1500}
          height={1500}
        />
      </div>
    </section>
  );
}

export default ProductDescription;
