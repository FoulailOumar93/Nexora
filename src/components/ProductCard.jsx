import { Link } from "react-router-dom";

function ProductCard({
  id,
  image,
  title,
  price,
  addToCart
}) {

  const product = {
    id,
    image,
    title,
    price
  };

  /* =========================
     DETECT CATEGORY
  ========================= */

  const lowerTitle = title.toLowerCase();

  const isCottonSaree =
    lowerTitle.includes("cotton saree");

  const isKanjivaramSilk =
    lowerTitle.includes("kanjivaram silk") ||
    lowerTitle.includes("kanchipuram silk");

  const isAraniSilk =
    lowerTitle.includes("arani silk");

  const isMysoreSilk =
    lowerTitle.includes("mysore silk");

  const isChuridar =
    lowerTitle.includes("churidar");

  const isVeshti =
    lowerTitle.includes("veshti");

  const isBag =
    lowerTitle.includes("bag") ||
    lowerTitle.includes("handbag");

  const isHoodie =
    lowerTitle.includes("hoodie");

  const isTshirt =
    lowerTitle.includes("t-shirt") ||
    lowerTitle.includes("tee");

  const isShirt =
    lowerTitle.includes("shirt") &&
    !isVeshti;

  const isPants =
    lowerTitle.includes("pants") ||
    lowerTitle.includes("trouser");

  const isSneakers =
    lowerTitle.includes("nike") ||
    lowerTitle.includes("sneaker");

  /* =========================
     COLLECTION SAREE
  ========================= */

  const isSareeCollection =
    isCottonSaree ||
    isKanjivaramSilk ||
    isAraniSilk ||
    isMysoreSilk;

  return (

    <div className="product-card">

      {/* IMAGE */}

      <div
        className={
          isSareeCollection
            ? "product-image-container collection-image"
            : "product-image-container"
        }
      >

        <Link to={`/product/${id}`}>

          <img
            src={image}
            alt={title}
            className="product-image"
          />

        </Link>

        {/* BADGE */}

        <span className="product-badge">
          NEW DROP
        </span>

      </div>

      {/* INFO */}

      <div className="product-info">

        {/* CATEGORY */}

        <p className="product-category">

          {isCottonSaree
            ? "NEXORA COTTON SAREE COLLECTION"
            : isKanjivaramSilk
              ? "NEXORA KANJIVARAM SILK COLLECTION"
              : isAraniSilk
                ? "NEXORA ARANI SILK COLLECTION"
                : isMysoreSilk
                  ? "NEXORA MYSORE SILK COLLECTION"
                  : isChuridar
                    ? "NEXORA CHURIDAR COLLECTION"
                    : isBag
                      ? "NEXORA LUXURY HANDBAG COLLECTION"
                      : isVeshti
                        ? "NEXORA TRADITION COLLECTION"
                        : isHoodie
                          ? "NEXORA STREETWEAR COLLECTION"
                          : isTshirt
                            ? "NEXORA STREETWEAR COLLECTION"
                            : isShirt
                              ? "NEXORA CLASSIC COLLECTION"
                              : isPants
                                ? "NEXORA TAILORING COLLECTION"
                                : isSneakers
                                  ? "NEXORA FOOTWEAR COLLECTION"
                                  : "NEXORA COLLECTION"}

        </p>

        {/* TITLE */}

        <h3 className="product-title">
          {title}
        </h3>

        {/* PRICE */}

        <p className="product-price">
          {price}€
        </p>

        {/* BUTTON */}

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Ajouter au panier
        </button>

      </div>

    </div>

  );

}

export default ProductCard;