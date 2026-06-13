import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {
  useAuth
} from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MemberPage({
  cartCount,
  setIsCartOpen
}) {

  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loadingOrders, setLoadingOrders] =
    useState(true);

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "nexoraToken"
            );

          if (!token) {

            setLoadingOrders(false);

            return;

          }

          const response =
            await axios.get(
              "http://localhost:3000/orders",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setOrders(
            response.data
          );

        } catch (error) {

          console.error(
            "Erreur récupération commandes :",
            error
          );

        } finally {

          setLoadingOrders(
            false
          );

        }

      };

    fetchOrders();

  }, []);

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  if (!user) {

    navigate("/login");

    return null;

  }
const [searchQuery, setSearchQuery] =
  useState("");
  return (

    <>

      <Navbar
  cartCount={cartCount}
  setIsCartOpen={setIsCartOpen}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>

      <main className="member-page">

        <div className="member-container">

          <h1>
            Mon compte
          </h1>

          <div className="member-card">

            <h2>
              👤 Informations
            </h2>

            <p>
              <strong>Prénom :</strong>{" "}
              {user.firstName}
            </p>

            <p>
              <strong>Nom :</strong>{" "}
              {user.lastName}
            </p>

            <p>
              <strong>Email :</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>Rôle :</strong>{" "}
              {user.role}
            </p>

          </div>

          <div className="member-card">

            <h2>
              ❤️ Mes favoris
            </h2>

            <p>
              Les favoris vont être reliés à ton compte
              avec PostgreSQL dans la prochaine étape.
            </p>

            <button
              onClick={() =>
                navigate("/favoris")
              }
            >
              Voir mes favoris
            </button>

          </div>

          <div className="member-card">

            <h2>
              🛍 Historique d'achats
            </h2>

            {loadingOrders ? (

              <p>
                Chargement des commandes...
              </p>

            ) : orders.length === 0 ? (

              <p>
                Aucune commande trouvée.
              </p>

            ) : (

              orders.map(
                (order) => (

                  <div
                    key={order.id}
                    style={{
                      marginBottom: "1rem",
                      padding: "1rem",
                      border: "1px solid #ddd",
                      borderRadius: "8px"
                    }}
                  >

                    <p>
                      <strong>
                        Commande #{order.id}
                      </strong>
                    </p>

                    <p>
                      Total :{" "}
                      {Number(
                        order.total
                      ).toFixed(2)} €
                    </p>

                    <p>
                      Statut :{" "}
                      {order.status}
                    </p>

                    <p>
                      Date :{" "}
                      {new Date(
                        order.created_at
                      ).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>

                  </div>

                )
              )

            )}

          </div>

          <div className="member-actions">

            <button
              onClick={handleLogout}
            >
              🚪 Déconnexion
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </>

  );

}

export default MemberPage;