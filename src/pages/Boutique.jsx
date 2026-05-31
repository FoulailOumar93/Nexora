import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";

function Boutique({
  cartCount,
  setIsCartOpen,
  addToCart
}) {

  const { category } = useParams();

  /* =========================
     CATEGORY TITLES
  ========================= */

const categoryTitles = {

  hoodies: "Collection Hoodies",

  tshirts: "Collection T-Shirts",

  chemises: "Collection Chemises",

  pantalons: "Collection Pantalons",

  chaussures: "Collection Chaussures",

  sacs: "Nexora Luxury Handbag Collection",

  "kanjivaram-silk":
    "Nexora Kanjivaram Silk Collection",

  "cotton-silk":
    "Nexora Cotton Saree Collection",

  "arani-silk":
    "Nexora Arani Silk Bridal Collection",

  "mysore-silk":
    "Nexora Mysore Silk Festive Collection",

  churidar:
    "Nexora Churidar Collection",

  veshti:
    "Nexora Veshti Collection"

};
  /* =========================
     PAGE TITLE
  ========================= */

  const pageTitle =
    categoryTitles[category] ||
    "NEXORA";

  /* =========================
     PAGE DESCRIPTION
  ========================= */

  let pageDescription =
    "Fashion • Streetwear • Lifestyle";

  if (category === "kanjivaram-silk") {
    pageDescription =
      "L'élégance intemporelle des Kanjivaram Silk Sarees";
  }

  if (category === "cotton-silk") {
    pageDescription =
      "Légèreté, confort et élégance au quotidien";
  }

  if (category === "arani-silk") {
    pageDescription =
      "Collection mariage Arani Silk inspirée du Tamil Nadu";
  }

  if (category === "mysore-silk") {
    pageDescription =
      "Couleurs festives et raffinement du Mysore Silk";
  }

  if (category === "churidar") {
    pageDescription =
      "Tradition et modernité dans une collection Churidar élégante";
  }

  if (category === "veshti") {
    pageDescription =
      "Le style traditionnel tamoul revisité par Nexora";
  }

  return (

    <>

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />

      {/* =========================
          PAGE
      ========================= */}

      <main className="page-spacer boutique-page">

        {/* =========================
            HERO
        ========================= */}

        <section className="boutique-hero">

          <h1>

            {pageTitle}

          </h1>

          <p>

            {pageDescription}

          </p>

        </section>

        {/* =========================
            BACK BUTTON
        ========================= */}

        <Link
          to="/"
          className="back-link"
        >
          ← Retour à l'accueil
        </Link>

        {/* =========================
            PRODUCTS
        ========================= */}

        <Products
          addToCart={addToCart}
          searchQuery=""
          selectedCategory={category}
        />

      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </>

  );
}

export default Boutique;