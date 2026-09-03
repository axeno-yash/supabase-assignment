import React, { useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import ProductDescription from "./components/ProductDescription";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
import { supabase } from "./lib/supabase.js";

const MAX_QTY = 10;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [email, setEmail] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    }
    if (sortOrder === "high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);

  async function updateCart(newCart) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      goToLogin();
      return;
    }

    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", data.user.id);

    if (deleteError) {
      console.error("Could not update cart:", deleteError.message);
      return;
    }

    if (newCart.length > 0) {
      const { error: insertError } = await supabase.from("cart_items").insert(
        newCart.map((item) => ({
          user_id: data.user.id,
          product_id: item.id,
          quantity: item.quantity,
        })),
      );

      if (insertError) {
        console.error("Could not update cart:", insertError.message);
        return;
      }
    }

    setCartItems(newCart);
  }

  async function clearCart() {
    await updateCart([]);
  }

  async function handleAddToCart(product) {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= MAX_QTY) return;

      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      await updateCart(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];

      await updateCart(updatedCart);
    }
  }

  async function handleIncrease(id) {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity < MAX_QTY
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );

    await updateCart(updatedCart);
  }

  async function handleDecrease(id) {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    await updateCart(updatedCart);
  }

  async function handleRemove(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    await updateCart(updatedCart);
  }

  function handleDiscountCodeChange(e) {
    setDiscountCode(e.target.value);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  const pathname = window.location.pathname;

  function goToSignup() {
    window.location.pathname = "/signup";
  }

  function goToLogin() {
    window.location.pathname = "/login";
  }

  function goToHome() {
    window.location.pathname = "/";
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setIsLoggedIn(false);
    setCartItems([]);
    goToHome();
  }

  async function checkUser() {
    const { data } = await supabase.auth.getSession();
    const email = data.session?.user.user_metadata.email;
    setEmail(email);

    setIsLoggedIn(data.session !== null);

    if (!data.session) return;

    const { data: cart, error } = await supabase
      .from("cart_items")
      .select("quantity, products(id, name, price, image, category)")
      .eq("user_id", data.session.user.id);

    if (error) {
      console.error("Could not load cart:", error.message);
      return;
    }

    setCartItems(
      cart
        .filter((item) => item.products)
        .map((item) => ({ ...item.products, quantity: item.quantity })),
    );
  }
  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, image, category")
      .order("id");

    if (error) {
      setProductsError("Could not load products. Please try again later.");
    } else {
      setProducts(data);
    }
    setIsLoadingProducts(false);
  }

  useEffect(() => {
    checkUser();
    loadProducts();
  }, []);

  let content;

  if (pathname === "/signup") {
    content = <Signup goToHome={goToHome} goToLogin={goToLogin} />;
  } else if (pathname === "/login") {
    content = <Login goToHome={goToHome} />;
  } else {
    content = (
      <>
        <Navbar
          totalCart={totalQty}
          login={goToLogin}
          signup={goToSignup}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          email={email}
        />
        <ProductDescription />
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <div className="container">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="">Sort by price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
        <section id="products" className="section">
          {isLoadingProducts ? (
            <p className="container">Loading products...</p>
          ) : productsError ? (
            <p className="container">{productsError}</p>
          ) : (
            <ProductList
              products={sortedProducts}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          )}
        </section>
        <Cart
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClear={clearCart}
          maxQty={MAX_QTY}
          totalQty={totalQty}
          discountCode={discountCode}
          onDiscountCodeChange={handleDiscountCodeChange}
        />
      </>
    );
  }

  return <div>{content}</div>;
}

export default App;
