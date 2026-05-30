import {
  FaShoppingBag,
  FaSearch,
  FaUser,
  FaChevronDown
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import products from "../data/products";

function Navbar({
  cartCount = 0,
  setIsCartOpen = () => {},
  searchQuery = "",
  setSearchQuery = () => {}
}) {

  const {
    user,
    logout
  } = useAuth();

  const navigate = useNavigate();

  /* =========================
     DROPDOWN
  ========================= */

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  /* =========================
     SEARCH
  ========================= */

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

  return (

    <nav className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="logo-container"
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

      {/* =========================
          NAVIGATION
      ========================= */}

      <ul className="nav-links">

        {/* HOME */}

        <li>

          <Link to="/">
            Accueil
          </Link>

        </li>

        {/* SHOP */}

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
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Tous les produits

              </Link>

              <Link
                to="/boutique/hoodies"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Hoodies

              </Link>

              <Link
                to="/boutique/tshirts"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                T-Shirts

              </Link>

              <Link
                to="/boutique/chemises"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Chemises

              </Link>

              <Link
                to="/boutique/pantalons"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Pantalons

              </Link>

              <Link
                to="/boutique/chaussures"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Chaussures

              </Link>

              <Link
                to="/boutique/sacs"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Sacs

              </Link>

              <Link
                to="/boutique/sarees"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Sarees

              </Link>

              <Link
                to="/boutique/veshti"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              >

                Veshti

              </Link>

            </div>

          )}

        </li>

        {/* SUPPORT */}

        <li>

          <Link to="/support">
            Support
          </Link>

        </li>

      </ul>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="nav-icons">

        {/* SEARCH */}

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

          {/* SEARCH RESULTS */}

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

        {/* USER */}

        {user ? (

          <div className="user-box">

            <span>

              Bonjour {user.name}

            </span>

            <button onClick={logout}>

              Logout

            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="user-link"
          >

            <FaUser />

          </Link>

        )}

        {/* CART */}

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

    </nav>

  );
}

export default Navbar;