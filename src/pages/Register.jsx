import { Link } from "react-router-dom";

function Register() {

  return (

    <main className="auth-page">

      <div className="auth-box">

        <h1>
          Inscription
        </h1>

        <p>
          Rejoignez l’univers NEXORA
        </p>

        <form className="auth-form">

          <div className="auth-grid">

            <input
              type="text"
              placeholder="Prénom"
            />

            <input
              type="text"
              placeholder="Nom"
            />

          </div>

          <input
            type="email"
            placeholder="Adresse email"
          />

          <input
            type="password"
            placeholder="Mot de passe"
          />

          <input
            type="password"
            placeholder="Confirmer mot de passe"
          />

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