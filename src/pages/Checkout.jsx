import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {

  return (
    <>

      <Navbar
        cartCount={0}
        setIsCartOpen={() => {}}
      />

      <main className="checkout-page">

        {/* LEFT */}

        <div className="checkout-left">

          <h1>
            Checkout
          </h1>

          {/* CONTACT */}

          <div className="checkout-section">

            <h2>
              Informations
            </h2>

            <div className="checkout-grid">

              <input
                type="text"
                placeholder="Prénom"
              />

              <input
                type="text"
                placeholder="Nom"
              />

            </div>

            <input
              type="email"
              placeholder="Adresse email"
            />

            <input
              type="tel"
              placeholder="Téléphone"
            />

          </div>

          {/* DELIVERY */}

          <div className="checkout-section">

            <h2>
              Livraison
            </h2>

            <input
              type="text"
              placeholder="Adresse"
            />

            <div className="checkout-grid">

              <input
                type="text"
                placeholder="Ville"
              />

              <input
                type="text"
                placeholder="Code postal"
              />

            </div>

            <input
              type="text"
              placeholder="Pays"
            />

          </div>

          {/* PAYMENT */}

          <div className="checkout-section">

            <h2>
              Paiement
            </h2>

            <input
              type="text"
              placeholder="Nom sur la carte"
            />

            <input
              type="text"
              placeholder="Numéro de carte"
            />

            <div className="checkout-grid">

              <input
                type="text"
                placeholder="MM/AA"
              />

              <input
                type="text"
                placeholder="CVV"
              />

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="checkout-right">

          <div className="summary-box">

            <h2>
              Résumé
            </h2>

            <div className="summary-item">

              <span>Hoodie Nexora</span>

              <span>49,90€</span>

            </div>

            <div className="summary-item">

              <span>Oversize T-Shirt</span>

              <span>29,90€</span>

            </div>

            <div className="summary-total">

              <span>Total</span>

              <span>79,80€</span>

            </div>

            <button className="pay-btn">

              Payer maintenant

            </button>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}

export default Checkout;