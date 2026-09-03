function Button({ onClick, value, disabled, variant = "primary", className = "" }) {
  const baseClass = "btn";
  const variantClass = variant === "danger" ? "btn-danger" : variant === "outline" ? "btn-outline" : "btn-primary";
  const sizeClass = className.includes("btn-sm") ? "btn-sm" : "";
  const fitClass = className.includes("btn-fit") ? "btn-fit" : "";
  const combinedClass = [baseClass, variantClass, sizeClass, fitClass, className].filter(Boolean).join(" ");
  
  return (
    <button onClick={onClick} disabled={disabled} className={combinedClass}>
      {value}
    </button>
  )
}

export default Button