import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Confirmation() {

  const orderNumber =
    `NX-${Date.now()}`;

  return (

    <>

      <Navbar
        cartCount={0}
        setIsCartOpen={() => {}}
      />

      <main className="confirmation-page">

        <div className="confirmation-box">

          <h1>

            ✅ Commande confirmée

          </h1>

          <p>

            Merci pour votre commande
            chez Nexora.

          </p>

          <p>

            Numéro de commande :

          </p>

          <strong>

            {orderNumber}

          </strong>

          <p>

            Un email de confirmation
            vous sera envoyé prochainement.

          </p>

          <Link to="/">

            <button
              className="pay-btn"
            >

              Retour à l'accueil

            </button>

          </Link>

        </div>

      </main>

      <Footer />

    </>

  );

}

export default Confirmation;