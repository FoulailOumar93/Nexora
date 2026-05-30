function Promo() {
  return (
    <section
      className="promo-section"
      id="promo"
    >
      <div className="promo-overlay"></div>

      <div className="promo-content">
        <p className="promo-badge">
          ✨ OFFRE LIMITÉE
        </p>

        <h2>
          Tradition & Élégance
          <br />
          chez Nexora
        </h2>

        <span className="promo-text">
          Profitez de
          {" "}
          <strong>-10%</strong>
          {" "}
          sur votre première commande avec le code :
          {" "}
          <strong>NEXORA10</strong>
        </span>

        <div className="promo-buttons">
          <a href="#products">
            <button className="promo-btn">
              Découvrir la boutique
            </button>
          </a>

          <a href="/support">
            <button className="promo-btn secondary-btn">
              Besoin d’aide ?
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Promo;