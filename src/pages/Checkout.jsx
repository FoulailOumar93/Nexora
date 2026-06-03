import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

function Checkout() {
 const [promoCode, setPromoCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);
  const cart =
    JSON.parse(
      localStorage.getItem("nexoraCart")
    ) || [];

  const total =
    cart.reduce((acc, item) => {

      const cleanPrice =
        String(item.price)
          .replace(",", ".")
          .replace("€", "");

      return (
        acc +
        parseFloat(cleanPrice) *
        (item.quantity || 1)
      );

    }, 0);

  const monthlyPayment =
    total / 3;
const finalTotal =
  total - discount;
    const applyPromoCode = () => {

  const code =
    promoCode.toUpperCase();

  if (code === "NEXORA10") {

    setDiscount(total * 0.10);

  } else if (
    code === "WELCOME15"
  ) {

    setDiscount(total * 0.15);

  } else if (
    code === "PREMIUM20"
  ) {

    setDiscount(total * 0.20);

  } else {

    setDiscount(0);

    alert(
      "Code promo invalide"
    );

  }

};

  const handlePayment = () => {

    if (cart.length === 0) {

      alert(
        "Votre panier est vide."
      );

      return;

    }

    alert(
      "✅ Paiement validé !\n\nMerci pour votre commande sur Nexora."
    );

    localStorage.removeItem(
      "nexoraCart"
    );

    window.location.href =
  "/confirmation";

  };

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

            <div className="payment-methods">

              <h3>
                Moyens de paiement acceptés
              </h3>

              <p>
                Visa • Mastercard • PayPal
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="checkout-right">

          <div className="summary-box">

            <h2>
              Résumé de commande
            </h2>

            {cart.length === 0 ? (

              <p>
                Votre panier est vide
              </p>

            ) : (

              cart.map(
                (item, index) => {

                  const itemTotal =
                    parseFloat(
                      String(item.price)
                        .replace(",", ".")
                        .replace("€", "")
                    ) *
                    (item.quantity || 1);

                  return (

                  <div
                    className="summary-item checkout-product-item"
                    key={index}
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="checkout-product-image"
                    />

                    <div className="checkout-product-info">

                      <strong>
                        {item.title}
                      </strong>

                      {item.selectedColor && (
                        <span>
                          Couleur : {item.selectedColor}
                        </span>
                      )}

                      {item.selectedSize && (
                        <span>
                          Taille : {item.selectedSize}
                        </span>
                      )}

                      <span>
                        Quantité : {item.quantity || 1}
                      </span>

                    </div>

                    <span className="checkout-product-price">
                      {itemTotal.toFixed(2)}€
                    </span>

                  </div>

                  );

                }
              )

            )}

            <div className="promo-box">

  <input
    type="text"
    placeholder="Code promo"
    value={promoCode}
    onChange={(e) =>
      setPromoCode(
        e.target.value
      )
    }
  />

  <button
    type="button"
    onClick={applyPromoCode}
  >

    Appliquer

  </button>

</div>

            <div className="summary-total">
{discount > 0 && (

  <div className="summary-item">

    <span>
      Réduction
    </span>

    <span>

      -{discount.toFixed(2)}€

    </span>

  </div>

)}
              <span>
                Total
              </span>

              <span>

                {finalTotal.toFixed(2)}€

              </span>

            </div>

            {finalTotal >= 100 && (

              <div className="installments">

                <h3>

                  Paiement en 3x
                  sans frais

                </h3>

                <p>

                  3 mensualités de
                  {" "}
                  {(finalTotal / 3).toFixed(2)}€

                </p>

              </div>

            )}

            <button
              className="pay-btn"
              onClick={handlePayment}
            >

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