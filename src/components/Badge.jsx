function Badge({ text, variant = "default" }) {
  const variantClass = variant === "in-cart" ? "badge-in-cart" : "badge-default";
  return <span className={`badge ${variantClass}`}>{text}</span>;
}

export default Badge