import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Support from "./pages/Support";
import Boutique from "./pages/Boutique";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./components/Cart";
import Confirmation from "./pages/Confirmation";
import Favoris from "./pages/Favoris";
import MemberPage from "./pages/MemberPage";
import Admin from "./pages/Admin";
import ForgotPassword
from "./pages/ForgotPassword";
import ResetPassword
from "./pages/ResetPassword";
function App() {

  /* =========================
     CART STATE
  ========================= */

  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem("nexoraCart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  /* =========================
     CART DRAWER
  ========================= */

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* =========================
     NOTIFICATION
  ========================= */

  const [notification, setNotification] =
    useState("");

  /* =========================
     SAVE CART
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "nexoraCart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* =========================
     CART COUNT
  ========================= */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + (item.quantity || 1),
      0
    );
const [favorites, setFavorites] =
  useState(() => {

    const savedFavorites =
      localStorage.getItem(
        "nexoraFavorites"
      );

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

  });

  useEffect(() => {

  localStorage.setItem(
    "nexoraFavorites",
    JSON.stringify(favorites)
  );

}, [favorites]);
  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {

    setCart((prevCart) => {

      const existingProductIndex =
        prevCart.findIndex(

          (item) =>

            item.id === product.id &&
            item.selectedSize ===
              product.selectedSize &&
            item.selectedColor ===
              product.selectedColor

        );

      if (
        existingProductIndex !== -1
      ) {

        const updatedCart =
          [...prevCart];

        updatedCart[
          existingProductIndex
        ] = {

          ...updatedCart[
            existingProductIndex
          ],

          quantity:
            (
              updatedCart[
                existingProductIndex
              ].quantity || 1
            ) +
            (product.quantity || 1)

        };

        return updatedCart;

      }

      return [

        ...prevCart,

        product

      ];

    });

    setNotification(
      `${product.title} ajouté au panier`
    );

    setTimeout(() => {

      setNotification("");

    }, 2500);

  };

  /* =========================
     REMOVE ITEM
  ========================= */

  const removeFromCart = (
    indexToRemove
  ) => {

    const updatedCart =
      cart.filter(

        (_, index) =>
          index !== indexToRemove

      );

    setCart(updatedCart);

  };

  /* =========================
     CLEAR CART
  ========================= */

  const clearCart = () => {

    setCart([]);

  };

  return (

    <>

      {/* =========================
          NOTIFICATION
      ========================= */}

      {notification && (

        <div className="notification">

          {notification}

        </div>

      )}

      {/* =========================
          ROUTES
      ========================= */}
      <ScrollToTop />
      <Routes>
      
        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              cartCount={cartCount}
              setIsCartOpen={
                setIsCartOpen
              }
              addToCart={addToCart}
            />
          }
        />

        {/* PRODUCT */}

        <Route
          path="/product/:id"
          element={
            <Product
              cartCount={cartCount}
              setIsCartOpen={
                setIsCartOpen
              }
              addToCart={addToCart}
            />
          }
        />

        {/* BOUTIQUE */}

        <Route
          path="/boutique"
          element={
            <Boutique
              cartCount={cartCount}
              setIsCartOpen={
                setIsCartOpen
              }
              addToCart={addToCart}
            />
          }
        />

        {/* BOUTIQUE CATEGORIES */}

        <Route
          path="/boutique/:category"
          element={
            <Boutique
              cartCount={cartCount}
              setIsCartOpen={
                setIsCartOpen
              }
              addToCart={addToCart}
            />
          }
        />

       {/* CHECKOUT */}

        <Route
  path="/checkout"
  element={
    <Checkout
      cartCount={cartCount}
      setIsCartOpen={setIsCartOpen}
    />
  }
/>

        {/* CONFIRMATION */}

        <Route
        path="/confirmation"
        element={
        <Confirmation
        setCart={setCart}
      />
  }
/>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* SUPPORT */}

        <Route
          path="/support"
          element={<Support />}
        />
       <Route
          path="/member"
          element={
      <MemberPage
       cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />
  }
/>

<Route
  path="/profile"
  element={
    <Profile
      cartCount={cartCount}
      setIsCartOpen={setIsCartOpen}
    />
  }
/>
        <Route
        path="/admin"
        element={<Admin />}
       />
          {/* Favoris */}

    <Route
  path="/favoris"
  element={
    <Favoris
      cartCount={cartCount}
      setIsCartOpen={setIsCartOpen}
      addToCart={addToCart}
    />
  }
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

</Routes>
      {/* =========================
          CART
      ========================= */}

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

export default App;