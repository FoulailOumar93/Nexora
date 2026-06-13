import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import {
  useAuth
} from "../context/AuthContext";

function Register() {

  const navigate = useNavigate();

  const { register } = useAuth();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

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

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setError(
        "Veuillez remplir tous les champs."
      );

      return;

    }

    if (
      password.length < 8
    ) {

      setError(
        "Le mot de passe doit contenir au moins 8 caractères."
      );

      return;

    }

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Les mots de passe ne correspondent pas."
      );

      return;

    }

  const result =
  await register(
    firstName,
    lastName,
    email,
    password
  );
  
    if (!result.success) {

      setError(
        result.message
      );

      return;

    }

    alert(
      "Compte créé avec succès !"
    );

    navigate("/login");

  };

  return (

    <main className="auth-page">

      <div className="auth-box">

        <Link
          to="/"
          className="auth-back"
        >
          ← Retour à l'accueil
        </Link>

        <h1>
          Inscription
        </h1>

        <p>
          Rejoignez l’univers NEXORA
        </p>

        {error && (

          <p className="auth-error">
            {error}
          </p>

        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-grid">

            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
            />

          </div>

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Mot de passe"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </button>

          </div>

          <div className="password-rules">

            <p
              className={
                password.length >= 8
                  ? "rule-valid"
                  : "rule-invalid"
              }
            >
              ✓ Minimum 8 caractères
            </p>

          </div>

          <div className="password-wrapper">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirmer mot de passe"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >

              {showConfirmPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </button>

          </div>

          <button type="submit">

            Créer un compte

          </button>

        </form>

        <span className="auth-switch">

          Déjà un compte ?

          <Link to="/login">

            Connexion

          </Link>

        </span>

      </div>

    </main>

  );

}

export default Register;