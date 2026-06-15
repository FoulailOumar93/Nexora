const express =
  require("express");

const router =
  express.Router();

const {
  getOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus
} = require(
  "../controllers/order.controller"
);

const isAuth =
  require(
    "../middlewares/auth.middleware"
  );

router.get(
  "/",
  isAuth,
  getOrders
);

router.get(
  "/admin",
  isAuth,
  getAllOrders
);

router.post(
  "/",
  isAuth,
  createOrder
);

router.patch(
  "/:id/status",
  isAuth,
  updateOrderStatus
);

module.exports =
  router;