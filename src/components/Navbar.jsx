import { FaShoppingBag, FaSearch, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">NEXORA</h1>

      <ul className="nav-links">
        <li>Accueil</li>
        <li>Boutique</li>
        <li>Catégories</li>
        <li>Contact</li>
      </ul>

      <div className="nav-icons">
        <FaSearch />
        <FaUser />
        <FaShoppingBag />
      </div>
    </nav>
  );
}

export default Navbar;