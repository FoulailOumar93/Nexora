import {
  FaShoppingBag,
  FaSearch,
  FaUser
} from "react-icons/fa";

function Navbar({
  cartCount,
  setIsCartOpen
}) {

  return (
    <nav className="navbar">

      {/* LOGO */}

      <div className="logo-container">

        <img
          src="/logo.png"
          alt="Nexora"
          className="site-logo"
        />

        <h1 className="logo">
          NEXORA
        </h1>

      </div>

      {/* MENU */}

      <ul className="nav-links">

        <li>Accueil</li>

        <li>Boutique</li>

        <li>Catégories</li>

        <li>Contact</li>

      </ul>

      {/* ICONS */}

      <div className="nav-icons">

        <FaSearch />

        <FaUser />

        <div
          className="cart-icon"
          onClick={() => setIsCartOpen(true)}
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