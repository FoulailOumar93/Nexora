const express =
  require("express");

const router =
  express.Router();

const {
  register,
  login,
  me,
  updateMe
} = require(
  "../controllers/auth.controller"
);

const isAuth =
  require(
    "../middlewares/auth.middleware"
  );

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  isAuth,
  me
);

router.patch(
  "/me",
  isAuth,
  updateMe
);

module.exports =
  router;