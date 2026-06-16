import {
  useState,
  useEffect
} from "react";

import "../styles/global.css";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile({
  cartCount,
  setIsCartOpen
}) {

  const {
    user,
    loading
  } = useAuth();

  const navigate =
    useNavigate();

  const [searchQuery, setSearchQuery] =
    useState("");

  const [formData, setFormData] =
    useState({

      firstName: "",

      lastName: "",

      email: "",

      phone: "",

      address: "",

      postal_code: "",

      city: "",

      country: "",

      avatar: ""

    });

  useEffect(() => {

    if (!loading && !user) {

      navigate("/login");

    }

  }, [user, loading, navigate]);

  useEffect(() => {

    if (user) {

      setFormData({

        firstName:
          user.firstName || "",

        lastName:
          user.lastName || "",

        email:
          user.email || "",

        phone:
          user.phone || "",

        address:
          user.address || "",

        postal_code:
          user.postal_code || "",

        city:
          user.city || "",

        country:
          user.country || "",

        avatar:
          user.avatar || ""

      });

    }

  }, [user]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "nexoraToken"
          );

        await axios.patch(

          "https://nexora-1e3z.onrender.com/auth/me",

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Profil mis à jour avec succès"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Erreur lors de la mise à jour"
        );

      }

    };

  if (loading) {

    return (
      <p>
        Chargement...
      </p>
    );

  }
await axios.patch(
  "https://nexora-1e3z.onrender.com/auth/me",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

navigate("/member");
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
            Mon profil
          </h1>

          <form
            onSubmit={handleSubmit}
            className="member-card profile-card"
          >

            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="postal_code"
              placeholder="Code postal"
              value={formData.postal_code}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="country"
              placeholder="Pays"
              value={formData.country}
              onChange={handleChange}
            />

            <button
              type="submit"
            >

              Enregistrer

            </button>

          </form>

        </div>

      </main>

      <Footer />

    </>

  );

}

export default Profile;