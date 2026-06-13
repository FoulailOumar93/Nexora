const express =
  require("express");

const router =
  express.Router();

const {
  getOrders,
  getAllOrders,
  createOrder
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

module.exports =
  router;