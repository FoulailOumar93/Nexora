import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

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

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

      if (
        !passwordRegex.test(password)
      ) {

        return toast.error(
          "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule et un chiffre."
        );

      }

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

        <div className="password-rules">

          <p>
            Votre mot de passe doit contenir :
          </p>

          <ul>

            <li>
              Au moins 12 caractères
            </li>

            <li>
              Une lettre majuscule
            </li>

            <li>
              Une lettre minuscule
            </li>

            <li>
              Un chiffre
            </li>

          </ul>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div
            style={{
              position: "relative"
            }}
          >

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                cursor: "pointer",
                color: "#d4af37",
                fontSize: "18px"
              }}
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </span>

          </div>

          <div
            style={{
              position: "relative"
            }}
          >

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                cursor: "pointer",
                color: "#d4af37",
                fontSize: "18px"
              }}
            >

              {showConfirmPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </span>

          </div>

          <button type="submit">

            Réinitialiser

          </button>

        </form>

      </div>

    </main>

  );

}

export default ResetPassword;
