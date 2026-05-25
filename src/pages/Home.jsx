import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Promo from "../components/Promo";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

function Home() {

  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [notification, setNotification] = useState("");

  const addToCart = (product) => {

    setCart([...cart, product]);

    setNotification(`${product.title} ajouté au panier`);

    setTimeout(() => {
      setNotification("");
    }, 2500);

  };

  const removeFromCart = (indexToRemove) => {

    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);

  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <Navbar
        cartCount={cart.length}
        setIsCartOpen={setIsCartOpen}
      />

      <Hero />

      <Products addToCart={addToCart} />

      <Promo />

      <Footer />

      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

    </>
  );
}

export default Home;