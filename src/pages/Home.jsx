import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Promo from "../components/Promo";
import Footer from "../components/Footer";

function Home({
  cartCount,
  setIsCartOpen,
  addToCart
}) {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>

      <Navbar
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Hero />

      <Products
        addToCart={addToCart}
        searchQuery={searchQuery}
      />

      <Promo />

      <Footer />

    </>
  );
}

export default Home;