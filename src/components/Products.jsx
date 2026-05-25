import products from "../data/products";
import ProductCard from "./ProductCard";

function Products() {
  return (
    <section className="products-section">
      <h2>NOS PRODUITS PHARES</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default Products;