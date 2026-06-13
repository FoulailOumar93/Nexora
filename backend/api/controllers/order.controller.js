const Order =
  require(
    "../models/order.model"
  );

async function getOrders(
  req,
  res
) {

  try {

    const orders =
      await Order.findAll({

        where: {

          user_id:
            req.user.id

        },

        order: [
          ["id", "DESC"]
        ]

      });

    res.json(
      orders
    );

  } catch (error) {

    console.error(
      error
    );

    res.status(500).json({

      message:
        "Erreur serveur"

    });

  }

}

async function getAllOrders(
  req,
  res
) {

  try {

    const orders =
      await Order.findAll({

        order: [
          ["id", "DESC"]
        ]

      });

    res.json(
      orders
    );

  } catch (error) {

    console.error(
      error
    );

    res.status(500).json({

      message:
        "Erreur serveur"

    });

  }

}

async function createOrder(
  req,
  res
) {

  try {

    const {
      total
    } = req.body;

    const order =
      await Order.create({

        total,

        status:
          "pending",

        user_id:
          req.user.id

      });

    res.status(201).json(
      order
    );

  } catch (error) {

    console.error(
      error
    );

    res.status(500).json({

      message:
        "Erreur serveur"

    });

  }

}

module.exports = {

  getOrders,

  getAllOrders,

  createOrder

};