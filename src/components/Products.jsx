import products from "../data/products";

import ProductCard from "./ProductCard";

function Products({
  addToCart,
  searchQuery = "",
  selectedCategory = ""
}) {

  /* =========================
     CATEGORY TITLES
  ========================= */

  const categoryTitles = {

    hoodies: "Hoodies",

    tshirts: "T-Shirts",

    chemises: "Chemises",

    pantalons: "Pantalons",

    chaussures: "Chaussures",

    sacs: "Sacs",

    sarees: "Sarees",

    veshti: "Veshti"

  };

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const matchesCategory =
        selectedCategory
          ? product.category ===
            selectedCategory
          : true;

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

  return (

    <section
      className="products-section"
    >

      {/* =========================
          TITLE
      ========================= */}

      <div className="products-header">

        <h2>

          {pageTitle}

        </h2>

        <p>

          Découvrez la collection
          premium Nexora.

        </p>

      </div>

      {/* =========================
          PRODUCTS GRID
      ========================= */}

      {filteredProducts.length > 0 ? (

        <div className="products-grid">

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

        <div className="no-products">

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