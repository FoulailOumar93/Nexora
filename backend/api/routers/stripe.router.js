const express =
  require("express");

const router =
  express.Router();

const {
  createCheckoutSession
} = require(
  "../controllers/stripe.controller"
);

const isAuth =
  require(
    "../middlewares/auth.middleware"
  );

router.post(
  "/create-checkout-session",
  isAuth,
  createCheckoutSession
);

module.exports =
  router;