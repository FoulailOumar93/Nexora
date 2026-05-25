import { Link } from "react-router-dom";

function ProductCard({
  image,
  title,
  price,
  addToCart
}) {

  const product = {
    image,
    title,
    price
  };

  return (

    <div className="product-card">

      <Link to={`/product/${title}`}>

        <img
          src={image}
          alt={title}
        />

      </Link>

      <div className="product-info">

        <h3>{title}</h3>

        <p>{price}</p>

        <button onClick={() => addToCart(product)}>
          Ajouter au panier
        </button>

      </div>

    </div>

  );
}

export default ProductCard;