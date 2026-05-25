function Cart({
  cart,
  isCartOpen,
  setIsCartOpen,
  removeFromCart,
  clearCart
}) {

  const total = cart.reduce((acc, item) => {
    return acc + parseFloat(item.price);
  }, 0);

  return (
    <>

      {isCartOpen && (
        <div
          className="overlay-cart"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>

        <div className="cart-header">

          <h2>Votre Panier</h2>

          <button onClick={() => setIsCartOpen(false)}>
            ✕
          </button>

        </div>

        <div className="cart-products">

          {cart.length === 0 ? (

            <p className="empty-cart">
              Votre panier est vide
            </p>

          ) : (

            cart.map((item, index) => (

              <div className="cart-item" key={index}>

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="cart-item-info">

                  <h4>{item.title}</h4>

                  <p>{item.price}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >

                    Supprimer

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        <div className="cart-footer">

          <h3>
            Total : {total.toFixed(2)}€
          </h3>

          <button className="checkout-btn">
            Checkout
          </button>

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