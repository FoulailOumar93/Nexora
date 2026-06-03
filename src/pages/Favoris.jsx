import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

        function Favoris({
        cartCount,
        setIsCartOpen
        }) {

  const favorites =
    JSON.parse(
      localStorage.getItem(
        "nexoraFavorites"
      )
    ) || [];

  return (

    <>

        <Navbar
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        />

      <main className="page-spacer">

        <section className="products-section">

          <div className="products-header">

            <h2>
              Mes Favoris ❤️
            </h2>

            <p>
              Retrouvez tous vos
              produits préférés.
            </p>

          </div>

          {favorites.length === 0 ? (

            <div className="no-products">

              <h3>
                Aucun favori
              </h3>

              <p>
                Ajoutez des produits
                à votre liste ❤️
              </p>

            </div>

          ) : (

            <div className="products-grid">

              {favorites.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    addToCart={() => {}}
                  />

                )
              )}

            </div>

          )}

        </section>

      </main>

      <Footer />

    </>

  );

}

export default Favoris;