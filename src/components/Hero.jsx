function Hero() {

  return (

    <section className="hero">

      <picture>

        <source
          media="(max-width:768px)"
          srcSet="/images/Banner/Nexora-Banner-Mobile.png"
        />

        <img
          src="/images/Banner/Nexora-Banner.png"
          alt="Nexora Banner"
          className="hero-banner-image"
        />

      </picture>

    </section>

  );

}

export default Hero;