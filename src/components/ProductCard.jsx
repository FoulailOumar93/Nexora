function ProductCard({ image, title, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />

      <div className="product-info">
        <h3>{title}</h3>
        <p>{price}</p>

        <button>Ajouter au panier</button>
      </div>
    </div>
  );
}

export default ProductCard;