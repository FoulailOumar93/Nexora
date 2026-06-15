const express = require("express");
const cors = require("cors");

require("dotenv").config();

const sequelize =
  require("./config/sequelize.client");

require(
  "./api/models/user.model"
);

require(
  "./api/models/product.model"
);

require(
  "./api/models/order.model"
);

const authRouter =
  require(
    "./api/routers/auth.router"
  );

const adminRouter =
  require(
    "./api/routers/admin.router"
  );

const productRouter =
  require(
    "./api/routers/product.router"
  );

const orderRouter =
  require(
    "./api/routers/order.router"
  );
const stripeRouter =
  require(
    "./api/routers/stripe.router.js" 
  );
  
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({

    message:
      "API Nexora opérationnelle"

  });

});

app.use(
  "/stripe",
  stripeRouter
);

app.use(
  "/auth",
  authRouter
);

app.use(
  "/admin",
  adminRouter
);

app.use(
  "/products",
  productRouter
);

app.use(
  "/orders",
  orderRouter
);

sequelize
  .authenticate()
  .then(async () => {

    await sequelize.sync();

    console.log(
      "✅ PostgreSQL connecté"
    );

    app.listen(
      process.env.PORT,
      () => {

        console.log(
          `🚀 Serveur lancé sur http://localhost:${process.env.PORT}`
        );

      }
    );

  })
  .catch((error) => {

    console.error(
      "❌ Erreur PostgreSQL :",
      error.message
    );

  });