import {
  useState,
  useEffect
} from "react";

import "../styles/global.css";
import { toast } from "react-hot-toast";
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
    loading,
    fetchUser
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

  const [passwordData, setPasswordData] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: ""

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

      const unchanged =

        formData.firstName === (user.firstName || "") &&
        formData.lastName === (user.lastName || "") &&
        formData.email === (user.email || "") &&
        formData.phone === (user.phone || "") &&
        formData.address === (user.address || "") &&
        formData.postal_code === (user.postal_code || "") &&
        formData.city === (user.city || "") &&
        formData.country === (user.country || "");

      if (unchanged) {

        toast(
          "Aucune modification détectée"
        );

        return;

      }

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

        await fetchUser();

        toast.success(
          "Profil mis à jour avec succès"
        );

        navigate("/member");

      } catch (error) {

        console.error(error);

        toast.error(
          "Erreur lors de la mise à jour"
        );

      }

    };

  const handlePasswordChange =
    async (e) => {

      e.preventDefault();

      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {

        toast.error(
          "Veuillez remplir tous les champs"
        );

        return;

      }

      try {

        const token =
          localStorage.getItem(
            "nexoraToken"
          );

        await axios.patch(

          "https://nexora-1e3z.onrender.com/auth/password",

          passwordData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        toast.success(
          "Mot de passe modifié avec succès"
        );

        setPasswordData({

          currentPassword: "",

          newPassword: "",

          confirmPassword: ""

        });

      } catch (error) {

        console.error(error);

        toast.error(

          error.response?.data?.message ||

          "Erreur lors de la modification"

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

          <form
            onSubmit={handlePasswordChange}
            className="member-card profile-card"
          >

            <h2>
              Modifier le mot de passe
            </h2>

            <input
              type="password"
              placeholder="Mot de passe actuel"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword:
                    e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword:
                    e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword:
                    e.target.value
                })
              }
            />

            <button
              type="submit"
            >
              Modifier le mot de passe
            </button>

          </form>

        </div>

      </main>

      <Footer />

    </>

  );

}

export default Profile;