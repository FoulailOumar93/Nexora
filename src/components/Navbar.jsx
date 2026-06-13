import {
  FaShoppingBag,
  FaSearch,
  FaUser,
  FaChevronDown,
  FaBars,
  FaTimes
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";

import axios from "axios";

function Navbar({
  cartCount = 0,
  setIsCartOpen = () => {},
  searchQuery = "",
  setSearchQuery = () => {}
}) {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [favoritesCount, setFavoritesCount] =
    useState(0);
  const [products, setProducts] =
  useState([]);

useEffect(() => {

  const updateFavorites = () => {

    const favorites =
      JSON.parse(
        localStorage.getItem(
          "nexoraFavorites"
        )
      ) || [];

    setFavoritesCount(
      favorites.length
    );

  };

  updateFavorites();

 window.addEventListener(
  "favoritesUpdated",
  updateFavorites
);

  return () => {

    window.removeEventListener(
  "favoritesUpdated",
  updateFavorites
  );

  };

}, []);

useEffect(() => {

  axios
    .get(
      "http://localhost:3000/products"
    )
    .then((response) => {

      setProducts(
        response.data
      );

    })
    .catch((error) => {

      console.error(
        error
      );

    });

}, []);



  const safeSearch =
    typeof searchQuery === "string"
      ? searchQuery
      : "";

  const filteredSuggestions =
    products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(
          safeSearch.toLowerCase()
        )
    );

  const closeMenus = () => {

    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

  };

  return (

<nav className="navbar">

  <button
    className="mobile-menu-btn"
    onClick={() =>
      setIsMobileMenuOpen(
        !isMobileMenuOpen
      )
    }
  >
    {isMobileMenuOpen
      ? <FaTimes />
      : <FaBars />}
  </button>

  <Link
    to="/"
    className="logo-container"
    onClick={closeMenus}
  >

    <img
      src="/logo.png"
      alt="Nexora"
      className="site-logo"
    />

    <div>

      <h1 className="logo">
        NEXORA
      </h1>

      <p className="logo-subtitle">
        Fashion • Streetwear • Lifestyle
      </p>

    </div>

  </Link>

      <ul className="nav-links">

        <li>

          <Link to="/">
            Accueil
          </Link>

        </li>

        <li className="dropdown-nav">

          <div
            className="dropdown-trigger"
            onClick={() =>
              setIsDropdownOpen(
                !isDropdownOpen
              )
            }
          >

            Boutique

            <FaChevronDown
              className={
                isDropdownOpen
                  ? "rotate-icon"
                  : ""
              }
            />

          </div>

          {isDropdownOpen && (

            <div className="dropdown-menu">

              <Link
                to="/boutique"
                onClick={closeMenus}
              >
                Tous les produits
              </Link>

              <Link
                to="/boutique/hoodies"
                onClick={closeMenus}
              >
                Hoodies
              </Link>

              <Link
                to="/boutique/tshirts"
                onClick={closeMenus}
              >
                T-Shirts
              </Link>

              <Link
                to="/boutique/chemises"
                onClick={closeMenus}
              >
                Chemises
              </Link>

              <Link
                to="/boutique/pantalons"
                onClick={closeMenus}
              >
                Pantalons
              </Link>

              <Link
                to="/boutique/chaussures"
                onClick={closeMenus}
              >
                Chaussures
              </Link>

              <Link
                to="/boutique/sacs"
                onClick={closeMenus}
              >
                Sacs
              </Link>

              <Link
                to="/boutique/sarees"
                onClick={closeMenus}
              >
                Sarees
              </Link>

              <Link
                to="/boutique/churidar"
                onClick={closeMenus}
              >
                Churidar
              </Link>

              <Link
                to="/boutique/veshti"
                onClick={closeMenus}
              >
                Veshti
              </Link>

            </div>

          )}

        </li>

        <li>

          <Link to="/support">
            Support
          </Link>

        </li>

      </ul>
 <div className="search-wrapper">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Rechercher..."
              value={safeSearch}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
            />

          </div>

          {safeSearch && (

            <div className="search-suggestions">

              {filteredSuggestions.length > 0 ? (

                filteredSuggestions.map(
                  (product) => (

                    <div
                      key={product.id}
                      className="suggestion-item"
                      onClick={() => {

                        navigate(
                          `/product/${product.id}`
                        );

                        setSearchQuery("");

                        closeMenus();

                      }}
                    >

                      <img
                        src={product.image}
                        alt={product.title}
                      />

                      <div>

                        <h4>
                          {product.title}
                        </h4>

                        <p>
                          {product.price}€
                        </p>

                      </div>

                    </div>

                  )
                )

              ) : (

                <p className="no-suggestion">
                  Aucun résultat
                </p>

              )}

            </div>

          )}

        </div>

      <div className="nav-icons">

        <Link
          to={user ? "/member" : "/login"}
          className="user-link"
          onClick={closeMenus}
        >
          <FaUser />
        </Link>
        <Link
          to="/favoris"
          className="favorite-icon"
          onClick={closeMenus}
        >

          ❤️

          <span className="favorite-count">

            {favoritesCount}

          </span>

        </Link>

        <div
          className="cart-icon"
          onClick={() =>
            setIsCartOpen(true)
          }
        >

          <FaShoppingBag />

          <span className="cart-count">

            {cartCount}

          </span>

        </div>

      </div>

      {isMobileMenuOpen && (

        <div className="mobile-menu">

          <Link to="/" onClick={closeMenus}>
            Accueil
          </Link>

          <Link to="/boutique" onClick={closeMenus}>
            Boutique
          </Link>

          <Link to="/boutique/hoodies" onClick={closeMenus}>
            Hoodies
          </Link>

          <Link to="/boutique/tshirts" onClick={closeMenus}>
            T-Shirts
          </Link>

          <Link to="/boutique/chemises" onClick={closeMenus}>
            Chemises
          </Link>

          <Link to="/boutique/pantalons" onClick={closeMenus}>
            Pantalons
          </Link>

          <Link to="/boutique/chaussures" onClick={closeMenus}>
            Chaussures
          </Link>

          <Link to="/boutique/sacs" onClick={closeMenus}>
            Sacs
          </Link>

          <Link to="/boutique/sarees" onClick={closeMenus}>
            Sarees
          </Link>

          <Link to="/boutique/churidar" onClick={closeMenus}>
            Churidar
          </Link>

          <Link to="/boutique/veshti" onClick={closeMenus}>
            Veshti
          </Link>
<Link
  to={user ? "/member" : "/login"}
  onClick={closeMenus}
>
  {user ? "Mon compte" : "Connexion"}
</Link>
          <Link to="/support" onClick={closeMenus}>
            Support
          </Link>

          {!user && (

            <Link
              to="/login"
              onClick={closeMenus}
            >
              Connexion
            </Link>

          )}

        </div>

      )}

    </nav>

  );

}

export default Navbar;