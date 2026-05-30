import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = (e) => {

    e.preventDefault();

    login(email);

    navigate("/");

  };

  return (

    <main className="auth-page">

      <div className="auth-box">

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
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

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