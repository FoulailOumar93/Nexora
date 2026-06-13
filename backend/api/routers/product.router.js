const express =
  require("express");

const router =
  express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require(
  "../controllers/product.controller"
);

const isAuth =
  require(
    "../middlewares/auth.middleware"
  );

const isAdmin =
  require(
    "../middlewares/isAdmin.middleware"
  );

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProductById
);

router.post(
  "/",
  isAuth,
  isAdmin,
  createProduct
);

router.put(
  "/:id",
  isAuth,
  isAdmin,
  updateProduct
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  deleteProduct
);

module.exports =
  router;