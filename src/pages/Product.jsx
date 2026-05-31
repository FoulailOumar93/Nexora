import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

function Product({
  cartCount,
  setIsCartOpen,
  addToCart
}) {

  const { id } = useParams();

  const product =
    products.find(
      (item) =>
        item.id === Number(id)
    );

  /* =========================
     PRODUCT NOT FOUND
  ========================= */

  if (!product) {

    return (

      <>

        <Navbar
          cartCount={cartCount}
          setIsCartOpen={setIsCartOpen}
        />

        <main className="product-page">

          <h1>

            Produit introuvable

          </h1>

          <Link
            to="/"
            className="back-link"
          >

            Retour à la boutique

          </Link>

        </main>

        <Footer />

      </>

    );

  }

  /* =========================
     STATES
  ========================= */

  const firstColor =
    product?.colors
      ? Object.keys(product.colors)[0]
      : "";

  const [selectedSize, setSelectedSize] =
    useState(
      product?.sizes?.[0] || ""
    );

  const [selectedBlouseSize, setSelectedBlouseSize] =
    useState(
      product?.blouseSizes?.[0] || ""
    );

  const [selectedColor, setSelectedColor] =
    useState(firstColor);

  const [selectedImage, setSelectedImage] =
    useState(
      product?.colors?.[firstColor] ||
      product?.image
    );

  const [quantity, setQuantity] =
    useState(1);

  const [showSizeGuide, setShowSizeGuide] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================
     CATEGORY TYPES
  ========================= */

  const isShoes =
    product.category === "chaussures";

  const isBag =
    product.category === "sacs";

  const isTraditional =
    product.category === "sarees" ||
    product.category === "veshti";

  /* =========================
     COLORS
  ========================= */

  const colors =
    product.colors
      ? Object.keys(product.colors)
      : [];

  /* =========================
     CHANGE COLOR
  ========================= */

  const handleColorChange = (
    color
  ) => {

    setSelectedColor(color);

    setSelectedImage(
      product.colors[color]
    );

  };

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {

    if (
      !isBag &&
      !selectedSize
    ) {

      setError(
        "Choisis une taille."
      );

      return;

    }

addToCart({

  ...product,

  image: selectedImage,

  selectedSize,

  selectedBlouseSize,

  selectedColor,

  quantity

});
    setError("");

  };

  return (

    <>

      {/* NAVBAR */}

      <Navbar
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />

      {/* PRODUCT PAGE */}

      <main className="product-page">

        <div className="product-detail">

          {/* IMAGE */}

          <div className="product-detail-image">

            <img
              src={selectedImage}
              alt={product.title}
            />

          </div>

          {/* INFO */}

          <div className="product-detail-info">

            <p className="product-label">

              NEXORA COLLECTION

            </p>

            <h1>

              {product.title}

            </h1>

            <p className="product-detail-price">

              {product.price}€

            </p>

      <p className="product-description">

  {product.description ||
    "Une pièce premium pensée pour un style moderne, urbain et élégant. Finition soignée, confort optimal et design tendance."}

</p>

            {/* SIZE */}

            {!isBag && (

              <div className="option-block">

                <div className="option-title">

                  <h3>

                    {isShoes
                      ? "Pointure"
                      : "Taille"}

                  </h3>

                  {!isTraditional && (

                    <button
                      onClick={() =>
                        setShowSizeGuide(true)
                      }
                    >

                      Guide des tailles

                    </button>

                  )}

                </div>

   <div className="sizes">

  {product.sizes.map((size) => (

    <button
      key={size}
      className={`size-btn ${
        selectedSize === size
          ? "active"
          : ""
      }`}
      onClick={() =>
        setSelectedSize(size)
      }
    >

      {size}

    </button>

  ))}

</div>

              </div>

            )}

            {/* BLOUSE SIZE */}

            {product.blouseSizes && (

              <div className="option-block">

                <h3>

                  Taille Blouse

                </h3>

                <div className="sizes">

                  {product.blouseSizes.map((size) => (

                    <span
                      key={size}
                      className={
                        selectedBlouseSize === size
                          ? "active-option"
                          : ""
                      }
                      onClick={() =>
                        setSelectedBlouseSize(size)
                      }
                    >

                      {size}

                    </span>

                  ))}

                </div>

              </div>

            )}

            {/* COLORS */}

            <div className="option-block">

              <h3>

                Couleur

              </h3>

              <div className="colors">

                {colors.map((color) => (

                  <button
                    key={color}
                    className={
                      selectedColor === color
                        ? "active-color"
                        : ""
                    }
                    onClick={() =>
                      handleColorChange(color)
                    }
                  >

                    {color}

                  </button>

                ))}

              </div>

            </div>

            {/* QUANTITY */}

            <div className="option-block">

              <h3>

                Quantité

              </h3>

              <div className="quantity-box">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                >

                  -

                </button>

                <span>

                  {quantity}

                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                >

                  +

                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (

              <p className="product-error">

                {error}

              </p>

            )}

            {/* BUTTON */}

            <button
              className="product-add-btn"
              onClick={handleAddToCart}
            >

              Ajouter au panier

            </button>

            {/* BACK */}

            <Link
              to="/"
              className="back-link"
            >

              Retour à la boutique

            </Link>

          </div>

        </div>

      </main>

      {/* SIZE GUIDE */}

      {showSizeGuide && (

        <div
          className="size-guide-overlay"
          onClick={() =>
            setShowSizeGuide(false)
          }
        >

          <div
            className="size-guide-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-guide"
              onClick={() =>
                setShowSizeGuide(false)
              }
            >

              ✕

            </button>

            <h2>

              Guide des tailles

            </h2>

            <table>

              <thead>

                <tr>

                  <th>Taille</th>
                  <th>Poitrine</th>
                  <th>Longueur</th>
                  <th>Épaules</th>

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>S</td>
                  <td>88-96 cm</td>
                  <td>66 cm</td>
                  <td>42 cm</td>
                </tr>

                <tr>
                  <td>M</td>
                  <td>96-104 cm</td>
                  <td>70 cm</td>
                  <td>45 cm</td>
                </tr>

                <tr>
                  <td>L</td>
                  <td>104-112 cm</td>
                  <td>74 cm</td>
                  <td>48 cm</td>
                </tr>

                <tr>
                  <td>XL</td>
                  <td>112-120 cm</td>
                  <td>78 cm</td>
                  <td>51 cm</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* FOOTER */}

      <Footer />

    </>

  );

}

export default Product;