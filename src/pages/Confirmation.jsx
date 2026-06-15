import { Link } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Confirmation({
  setCart
}) {

useEffect(() => {

  localStorage.removeItem(
    "nexoraCart"
  );

  setCart([]);

}, [setCart]);

  const lastOrder =
    JSON.parse(
      localStorage.getItem(
        "lastOrder"
      )
    );

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

            {lastOrder?.id}

          </strong>

          <p>

            Date :
            {" "}
            {lastOrder?.date}

          </p>

          <p>

            Total :
            {" "}
            {lastOrder?.total?.toFixed(2)}€

          </p>

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