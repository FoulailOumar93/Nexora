const express =
  require("express");

const router =
  express.Router();

const {
  register,
  login,
  me,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword
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

router.post(
  "/forgot-password",
  forgotPassword
);

router.patch(
  "/reset-password/:token",
  resetPassword
);

router.get(
  "/me",
  isAuth,
  me
);

router.patch(
  "/password",
  isAuth,
  changePassword
);

router.patch(
  "/me",
  isAuth,
  updateMe
);

module.exports =
  router;