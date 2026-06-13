import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
function Checkout({
  cartCount,
  setIsCartOpen
}) {

  const [promoCode, setPromoCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [deliveryType, setDeliveryType] =
    useState("home");

  const [relayPoint, setRelayPoint] =
    useState("");

  const [
    nearbyRelays,
    setNearbyRelays
  ] = useState([]);

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

  const finalTotal =
    total - discount;

  const applyPromoCode = () => {

    const code =
      promoCode.toUpperCase();

    if (code === "NEXORA10") {

      setDiscount(total * 0.10);

    } else if (code === "WELCOME15") {

      setDiscount(total * 0.15);

    } else if (code === "PREMIUM20") {

      setDiscount(total * 0.20);

    } else {

      setDiscount(0);

      alert("Code promo invalide");

    }

  };

  const detectLocation = () => {

    if (!navigator.geolocation) {

      alert(
        "La géolocalisation n'est pas disponible."
      );

      return;

    }

    navigator.geolocation.getCurrentPosition(

      () => {

        setNearbyRelays([
          "Mondial Relay - La Courneuve Centre",
          "Mondial Relay - Carrefour Drancy",
          "Relais Colis - Saint-Denis Gare",
          "Mondial Relay - Aubervilliers"
        ]);

      },

      () => {

        alert(
          "Impossible de récupérer votre position."
        );

      }

    );

  };

  const handlePayment =
  async () => {

    if (cart.length === 0) {

      alert(
        "Votre panier est vide."
      );

      return;

    }

    if (
      deliveryType === "relay" &&
      !relayPoint
    ) {

      alert(
        "Veuillez choisir un point relais."
      );

      return;

    }

  try {

  const token =
    localStorage.getItem(
      "nexoraToken"
    );

  await axios.post(
    "http://localhost:3000/orders",
    {
      total: finalTotal
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  console.log(
    "COMMANDE CRÉÉE"
  );

  alert(
    "✅ Paiement validé !"
  );

  localStorage.removeItem(
    "nexoraCart"
  );

  window.location.href =
    "/confirmation";

} catch (error) {

  console.error(error);

  alert(
    "Erreur lors de la création de la commande"
  );

localStorage.removeItem(
  "nexoraCart"
);

window.location.href =
  "/confirmation";
    }
    }
  return (

    <>

      <Navbar
  cartCount={cartCount}
  setIsCartOpen={setIsCartOpen}
/>
      <main className="checkout-page">

        <div className="checkout-left">

          <h1>
            Checkout
          </h1>

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

          <div className="checkout-section">

            <h2>
              Livraison
            </h2>

            <div className="delivery-choice">

              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="home"
                  checked={
                    deliveryType === "home"
                  }
                  onChange={(e) =>
                    setDeliveryType(
                      e.target.value
                    )
                  }
                />
                Livraison à domicile
              </label>

              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="relay"
                  checked={
                    deliveryType === "relay"
                  }
                  onChange={(e) =>
                    setDeliveryType(
                      e.target.value
                    )
                  }
                />
                Point relais
              </label>

            </div>

            {deliveryType === "home" ? (

              <>

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

              </>

            ) : (

              <>

                <button
                  type="button"
                  className="location-btn"
                  onClick={detectLocation}
                >
                  📍 Utiliser ma position
                </button>

                <select
                  value={relayPoint}
                  onChange={(e) =>
                    setRelayPoint(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Choisir un point relais
                  </option>

                  {nearbyRelays.length > 0 ? (

                    nearbyRelays.map(
                      (relay, index) => (

                        <option
                          key={index}
                          value={relay}
                        >
                          {relay}
                        </option>

                      )
                    )

                  ) : (

                    <>

                      <option value="Mondial Relay - Carrefour Drancy">
                        Mondial Relay - Carrefour Drancy
                      </option>

                      <option value="Mondial Relay - La Courneuve Centre">
                        Mondial Relay - La Courneuve Centre
                      </option>

                      <option value="Relais Colis - Saint-Denis Gare">
                        Relais Colis - Saint-Denis Gare
                      </option>

                      <option value="Mondial Relay - Aubervilliers">
                        Mondial Relay - Aubervilliers
                      </option>

                    </>

                  )}

                </select>

              </>

            )}

          </div>

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

              cart.map((item, index) => {

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

              })

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
                  Paiement en 3x sans frais
                </h3>

                <p>
                  3 mensualités de{" "}
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