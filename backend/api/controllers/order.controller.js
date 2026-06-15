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
      total,
      items
    } = req.body;

    const OrderItem =
      require(
        "../models/orderItem.model"
      );

    const order =
      await Order.create({

        total,

        status:
          "pending",

        user_id:
          req.user.id

      });

    if (
      items &&
      items.length > 0
    ) {

      for (
        const item of items
      ) {

        await OrderItem.create({

          order_id:
            order.id,

          product_id:
            item.id,

          title:
            item.title,

          image:
            item.image,

          quantity:
            item.quantity || 1,

          price:
            item.price,

          selected_size:
            item.selectedSize || null,

          selected_color:
            item.selectedColor || null

        });

      }

    }

    res
      .status(201)
      .json(order);

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

async function updateOrderStatus(
  req,
  res
) {

  try {

    const {
      id
    } = req.params;

    const {
      status
    } = req.body;

    const order =
      await Order.findByPk(id);

    if (!order) {

      return res
        .status(404)
        .json({
          message:
            "Commande introuvable"
        });

    }

    order.status =
      status;

    await order.save();

    res.json(order);

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

  createOrder,

  updateOrderStatus

};