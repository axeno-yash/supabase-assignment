
function Navbar({totalCart, login, signup, isLoggedIn, handleLogout, email}) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="navbar-logo">Sopify</a>
        <div className="navbar-links">
          <a href="#product-description" className="navbar-link">Product Desc.</a>
          <a href="#products" className="navbar-link">All Products</a>
          <a href="#cart" className="navbar-link">Cart({totalCart})</a>

          {isLoggedIn ? (
          <p className="badge badge-default">{email?.toUpperCase().split('@')[0]}</p>
          ) : (
            <a className="navbar-link" onClick={signup}>Signup</a>
          )}
          {isLoggedIn ? (
            <button type="button" className="navbar-link" onClick={handleLogout}>Logout</button>
          ) : (
            <a className="navbar-link" onClick={login}>Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar