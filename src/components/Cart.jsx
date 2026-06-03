import { Link } from "react-router-dom";

function Cart({
  cart,
  isCartOpen,
  setIsCartOpen,
  removeFromCart,
  clearCart
}) {

  const totalItems =
    cart.reduce(
      (acc, item) =>
        acc + (item.quantity || 1),
      0
    );

  const total =
    cart.reduce((acc, item) => {

      const cleanPrice =
        String(item.price)
          .replace(",", ".")
          .replace("€", "");

      return (
        acc +
        parseFloat(cleanPrice) *
        (item.quantity || 1)
      );

    }, 0);

  return (

    <>

      {/* OVERLAY */}

      {isCartOpen && (

        <div
          className="overlay-cart"
          onClick={() =>
            setIsCartOpen(false)
          }
        ></div>

      )}

      {/* DRAWER */}

      <div
        className={`cart-drawer ${
          isCartOpen ? "open" : ""
        }`}
      >

        {/* HEADER */}

        <div className="cart-header">

          <h2>

            Votre Panier ({totalItems})

          </h2>

          <button
            onClick={() =>
              setIsCartOpen(false)
            }
          >

            ✕

          </button>

        </div>

        {/* PRODUCTS */}

        <div className="cart-products">

          {cart.length === 0 ? (

            <p className="empty-cart">

              Votre panier est vide

            </p>

          ) : (

            cart.map((item, index) => (

              <div
                className="cart-item"
                key={index}
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="cart-item-info">

                  <h4>

                    {item.title}

                  </h4>

                  <p>

                    {item.price}
                    {" × "}
                    {item.quantity || 1}

                  </p>

                  {/* SIZE */}

                  {item.selectedSize && (

                    <span className="cart-detail">

                      Taille :{" "}
                      {item.selectedSize}

                    </span>

                  )}

                  {/* COLOR */}

                  {item.selectedColor && (

                    <span className="cart-detail">

                      Couleur :{" "}
                      {item.selectedColor}

                    </span>

                  )}

                  {/* QUANTITY */}

                  {item.quantity && (

                    <span className="cart-detail">

                      Quantité :{" "}
                      {item.quantity}

                    </span>

                  )}

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >

                    Supprimer

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* FOOTER */}

        <div className="cart-footer">
          {total < 100 ? (

  <div className="shipping-message">

    🚚 Encore{" "}
    {(100 - total).toFixed(2)}€
    pour profiter de la
    livraison offerte

  </div>

) : (

  <div className="shipping-message free">

    ✅ Livraison offerte
    débloquée

  </div>

)}
          <h3>

            Total :{" "}
            {total.toFixed(2)}€

          </h3>

          <Link to="/checkout">

            <button className="checkout-btn">

              Checkout

            </button>

          </Link>

          {cart.length > 0 && (

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >

              Vider le panier

            </button>

          )}

        </div>

      </div>

    </>

  );

}

export default Cart;