const Stripe =
  require("stripe");

const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY
  );

async function createCheckoutSession(
  req,
  res
) {

  try {

    const {
      items
    } = req.body;

    const line_items =
      items.map(
        (item) => ({

          price_data: {

            currency:
              "eur",

            product_data: {

              name:
                item.title,

              images: []

            },

            unit_amount:
              Math.round(
                Number(
                  String(item.price)
                    .replace(",", ".")
                    .replace("€", "")
                ) * 100
              )

          },

          quantity:
            item.quantity || 1

        })
      );

    const session =
      await stripe.checkout.sessions.create({

        payment_method_types: [
          "card"
        ],

        mode:
          "payment",

        line_items,

        success_url:
          "http://localhost:5173/confirmation",

        cancel_url:
          "http://localhost:5173/checkout"

      });

    res.json({

      url:
        session.url

    });

  } catch (error) {

    console.error(
      "STRIPE ERROR:",
      error
    );

    res.status(500).json({

      message:
        error.message

    });

  }

}

module.exports = {

  createCheckoutSession

};