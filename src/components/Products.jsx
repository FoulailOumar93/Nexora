import { useEffect, useState } from "react";

import axios from "axios";

import ProductCard from "./ProductCard";

function Products({
  addToCart,
  searchQuery = "",
  selectedCategory = ""
}) {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    axios
      .get(
        "http://localhost:3000/products"
      )
      .then((response) => {

        setProducts(
          response.data
        );

      })
      .catch((error) => {

        console.error(
          error
        );

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

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

    sarees: "Nexora Saree Collections",

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
     CATEGORY DESCRIPTIONS
  ========================= */

  const categoryDescriptions = {

    sarees:
      "Découvrez toutes les collections Saree Nexora inspirées du savoir-faire indien.",

    "kanjivaram-silk":
      "L'élégance intemporelle des Kanjivaram Silk Sarees.",

    "cotton-silk":
      "Légèreté, confort et élégance au quotidien.",

    "arani-silk":
      "Collection mariage Arani Silk inspirée du Tamil Nadu.",

    "mysore-silk":
      "Couleurs festives et raffinement du Mysore Silk.",

    churidar:
      "Tradition et modernité dans une collection Churidar élégante.",

    veshti:
      "Le style traditionnel tamoul revisité par Nexora."

  };

  if (loading) {

    return (

      <section
        className="products-section"
      >

        <div
          className="products-header"
        >

          <h2>
            Chargement...
          </h2>

        </div>

      </section>

    );

  }

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.title
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      let matchesCategory =
        true;

      if (selectedCategory) {

        if (
          selectedCategory ===
          "sarees"
        ) {

          matchesCategory =

            product.category ===
              "kanjivaram-silk" ||

            product.category ===
              "cotton-silk" ||

            product.category ===
              "arani-silk" ||

            product.category ===
              "mysore-silk";

        } else {

          matchesCategory =
            product.category ===
            selectedCategory;

        }

      }

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  /* =========================
     PAGE TITLE
  ========================= */

  const pageTitle =
    selectedCategory
      ? categoryTitles[
          selectedCategory
        ] || "Collection"
      : "NOS PRODUITS";

  /* =========================
     PAGE DESCRIPTION
  ========================= */

  const pageDescription =
    categoryDescriptions[
      selectedCategory
    ] ||
    "Découvrez la collection premium Nexora.";

  return (

    <section
      className="products-section"
    >

      <div
        className="products-header"
      >

        <h2>
          {pageTitle}
        </h2>

        <p>
          {pageDescription}
        </p>

      </div>

      {filteredProducts.length > 0 ? (

        <div
          className="products-grid"
        >

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                addToCart={addToCart}
              />

            )
          )}

        </div>

      ) : (

        <div
          className="no-products"
        >

          <h3>
            Aucun produit trouvé
          </h3>

          <p>
            Essayez une autre
            catégorie ou recherche.
          </p>

        </div>

      )}

    </section>

  );

}
export default Products;