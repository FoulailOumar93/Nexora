const express =
  require("express");

const router =
  express.Router();

const isAuth =
  require(
    "../middlewares/auth.middleware"
  );

const isAdmin =
  require(
    "../middlewares/isAdmin.middleware"
  );

const {
  getUsers
} = require(
  "../controllers/admin.controller"
);

router.get(
  "/users",
  isAuth,
  isAdmin,
  getUsers
);

module.exports =
  router;