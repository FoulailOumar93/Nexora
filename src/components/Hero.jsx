function Hero() {

  return (

    <section className="hero">

      {/* IMAGE */}

      <img
        src="/images/Nexora-Banner.png"
        alt="Nexora Summer Collection"
        className="hero-banner-image"
      />

      {/* OVERLAY */}

      <div className="overlay"></div>

      {/* CONTENT */}

      <div className="hero-content">

        <p>

          NOUVELLE COLLECTION

        </p>

        <h2>

          AFFIRME TON <br />

          STYLE

        </h2>

        <span>

          Des vêtements modernes
          pour ceux qui veulent
          se démarquer.

        </span>

      </div>

    </section>

  );

}

export default Hero;