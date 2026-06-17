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

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

const handleSubmit = async (e) => {

  e.preventDefault();

  const result =
    await login(
      email,
      password
    );

if (result.success) {

  if (result.user.role === "admin") {

    navigate("/admin");

  } else {

    navigate("/member");

  }

} else {

  alert(
    result.message
  );

}

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
          Connexion
        </h1>

        <p>
          Connectez-vous à votre compte NEXORA
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
              required
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
          <Link
            to="/forgot-password"
            className="forgot-password-link"
          >
            Mot de passe oublié ?
          </Link>
          <button type="submit">

            Se connecter

          </button>

        </form>

        <span className="auth-switch">

          Pas encore de compte ?

          <Link to="/register">

            Créer un compte

          </Link>

        </span>

      </div>

    </main>

  );

}

export default Login;