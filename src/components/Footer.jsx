import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer
      className="footer"
      id="footer"
    >

      <div className="footer-grid">

        {/* BRAND */}

        <div>

          <h2>
            NEXORA
          </h2>

          <p>
            Future streetwear experience.
          </p>

        </div>

        {/* SHOP */}

        <div>

          <h3>
            Boutique
          </h3>

          <Link to="/">
            Hoodies
          </Link>

          <Link to="/">
            T-shirts
          </Link>

          <Link to="/">
            Accessoires
          </Link>

        </div>

        {/* SUPPORT */}

        <div>

          <h3>
            Support
          </h3>

          <Link to="/support">
            Contact
          </Link>

          <Link to="/support">
            Livraison
          </Link>

          <Link to="/support">
            Retours
          </Link>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        © 2026 NEXORA — Tous droits réservés

      </div>

    </footer>

  );
}

export default Footer;