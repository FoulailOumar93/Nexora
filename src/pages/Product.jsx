import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Product({
  cartCount,
  setIsCartOpen,
  addToCart
}) {

  const { id } = useParams();
const [product, setProduct] =
  useState(null);

const [relatedProducts, setRelatedProducts] =
  useState([]);

const [loading, setLoading] =
  useState(true);

  const firstColor =
    product?.colors
      ? Object.keys(product.colors)[0]
      : "";

  const [selectedSize, setSelectedSize] =
  useState("");

  const [selectedBlouseSize, setSelectedBlouseSize] =
  useState("");

 const [selectedColor, setSelectedColor] =
  useState("");

 const [selectedImage, setSelectedImage] =
  useState("");

  useEffect(() => {

  axios
    .get(
      `https://nexora-1e3z.onrender.com/products/${id}`
    )
    .then((response) => {

      setProduct(
        response.data
      );

      return axios.get(
        "https://nexora-1e3z.onrender.com/products"
      );

    })
    .then((response) => {

      const currentProduct =
        response.data.find(
          (item) =>
            item.id === Number(id)
        );

      const related =
        response.data
          .filter(
            (item) =>
              item.category ===
                currentProduct.category &&
              item.id !==
                currentProduct.id
          )
          .slice(0, 4);

      setRelatedProducts(
        related
      );

      setLoading(false);

    })
    .catch((error) => {

      console.error(error);

      setLoading(false);

    });

}, [id]);
  
useEffect(() => {

  if (!product) return;

  
  setSelectedSize(
    product.sizes?.[0] || ""
  );

 setSelectedBlouseSize(
  product.blouse_sizes?.[0] || ""
  );
  setSelectedColor(
    firstColor
  );

  setSelectedImage(

    Array.isArray(
      product.colors?.[firstColor]
    )

      ? product.colors[firstColor][0]

      : product.colors?.[firstColor] ||
        product.image

  );

}, [product]);
  /* =========================
     STATES
  ========================= */

  const [currentImageIndex, setCurrentImageIndex] =
  useState(0);

  const [quantity, setQuantity] =
    useState(1);

  const [showSizeGuide, setShowSizeGuide] =
    useState(false);

  const [error, setError] =
  useState("");

if (loading) {

  return (

    <>
      <Navbar
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="product-page">

        <h1>
          Chargement...

        </h1>

      </main>

      <Footer />

    </>

  );

}

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

      </main>

      <Footer />

    </>

  );

}

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

  setCurrentImageIndex(0);

  const colorImages =
    product.colors[color];

  setSelectedImage(

    Array.isArray(colorImages)

      ? colorImages[0]

      : colorImages

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

  {Array.isArray(
    product.colors[selectedColor]
  ) &&
    product.colors[selectedColor]
      .length > 1 && (

<button
  className="gallery-btn left"
  onClick={() => {

    const images =
      product.colors[selectedColor];

    const newIndex =
      currentImageIndex === 0
        ? images.length - 1
        : currentImageIndex - 1;

    setCurrentImageIndex(
      newIndex
    );

    setSelectedImage(
      images[newIndex]
    );

  }}
>

  ‹

</button>

    )}

  <img
    src={selectedImage}
    alt={product.title}
  />

  {Array.isArray(
    product.colors[selectedColor]
  ) &&
    product.colors[selectedColor]
      .length > 1 && (

      <button
        className="gallery-btn right"
        onClick={() => {

          const images =
            product.colors[selectedColor];

          const newIndex =
            currentImageIndex ===
            images.length - 1
              ? 0
              : currentImageIndex + 1;

          setCurrentImageIndex(
            newIndex
          );

          setSelectedImage(
            images[newIndex]
          );

        }}
      >

        ›

      </button>

    )}

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

            {product.blouse_sizes && (

              <div className="option-block">

                <h3>

                  Taille Blouse

                </h3>

                <div className="sizes">

                  {product.blouse_sizes.map((size) => (

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
{/* RELATED PRODUCTS */}

{relatedProducts.length > 0 && (

  <section className="related-products">

    <h2>

      Vous aimerez aussi

    </h2>

    <div className="products-grid">

      {relatedProducts.map(
        (item) => (

          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            addToCart={addToCart}
          />

        )
      )}

    </div>

  </section>

)}

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