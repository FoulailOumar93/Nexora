import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  useNavigate,
  useParams
} from "react-router-dom";

function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.patch(

            `https://nexora-1e3z.onrender.com/auth/reset-password/${token}`,

            {

              password,

              confirmPassword

            }

          );

        toast.success(
          response.data.message
        );

        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } catch (error) {

        console.error(error);

        toast.error(

          error.response?.data?.message ||

          "Erreur lors de la réinitialisation"

        );

      }

    };

  return (

    <main className="auth-page">

      <div className="auth-box">

        <h1>
          Nouveau mot de passe
        </h1>

        <p>
          Choisissez un nouveau mot de passe.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">

            Réinitialiser

          </button>

        </form>

      </div>

    </main>

  );

}

export default ResetPassword;