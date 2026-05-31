import { Link } from "react-router-dom";

function Footer() {

  const currentYear =
    new Date().getFullYear();

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

        {/* BOUTIQUE */}

        <div>

          <h3>
            Boutique
          </h3>

          <Link to="/boutique/hoodies">
            Hoodies
          </Link>

          <Link to="/boutique/tshirts">
            T-Shirts
          </Link>

          <Link to="/boutique/chemises">
            Chemises
          </Link>

          <Link to="/boutique/pantalons">
            Pantalons
          </Link>

          <Link to="/boutique/chaussures">
            Chaussures
          </Link>

          <Link to="/boutique/sacs">
            Sacs
          </Link>

        </div>

        {/* FEMME */}

        <div>

          <h3>
            Collection Femme
          </h3>

          <Link to="/boutique/kanjivaram-silk">
            Kanjivaram Silk
          </Link>

          <Link to="/boutique/cotton-silk">
            Cotton Sarees
          </Link>

          <Link to="/boutique/arani-silk">
            Arani Silk
          </Link>

          <Link to="/boutique/mysore-silk">
            Mysore Silk
          </Link>

          <Link to="/boutique/churidar">
            Churidar
          </Link>

        </div>

        {/* HOMME */}

        <div>

          <h3>
            Collection Homme
          </h3>

          <Link to="/boutique/veshti">
            Veshti
          </Link>

          <Link to="/boutique/chemises">
            Chemises
          </Link>

          <Link to="/boutique/hoodies">
            Streetwear
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

          <Link to="/support">
            FAQ
          </Link>

        </div>

        {/* COMPTE */}

        <div>

          <h3>
            Compte
          </h3>

          <Link to="/login">
            Connexion
          </Link>

          <Link to="/register">
            Inscription
          </Link>

          <Link to="/checkout">
            Panier
          </Link>

        </div>

        {/* PAIEMENT */}

        <div>

          <h3>
            Paiements Sécurisés
          </h3>

          <p>Visa</p>
          <p>Mastercard</p>
          <p>PayPal</p>

        </div>

        {/* RESEAUX */}

        <div>

          <h3>
            Suivez-nous
          </h3>

          <a
            href="#"
            onClick={(e) =>
              e.preventDefault()
            }
          >
            Instagram
          </a>

          <a
            href="#"
            onClick={(e) =>
              e.preventDefault()
            }
          >
            Facebook
          </a>

          <a
            href="#"
            onClick={(e) =>
              e.preventDefault()
            }
          >
            TikTok
          </a>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        © {currentYear} NEXORA —
        Tous droits réservés

      </div>

    </footer>

  );

}

export default Footer;