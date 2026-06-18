import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Link,
  useNavigate
} from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(
            "https://nexora-1e3z.onrender.com/auth/forgot-password",
            {
              email
            }
          );

        toast.success(
          "Lien de réinitialisation généré"
        );

        navigate(
          `/reset-password/${response.data.token}`
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Erreur lors de la génération du lien"
        );

      }

    };

  return (

    <main className="auth-page">

      <div className="auth-box">

        <Link
          to="/login"
          className="auth-back"
        >
          ← Retour à la connexion
        </Link>

        <h1>
          Mot de passe oublié
        </h1>

        <p>
          Entrez votre adresse email.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <button type="submit">

            Continuer

          </button>

        </form>

      </div>

    </main>

  );

}

export default ForgotPassword;