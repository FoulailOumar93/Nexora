require("dotenv").config();

const sequelize =
  require("./config/sequelize.client");

const Product =
  require("./api/models/product.model");

const products =
  require("./products-import-data");

async function importProducts() {

  try {

    await sequelize.authenticate();

    console.log(
      "✅ PostgreSQL connecté"
    );

    await Product.destroy({
      where: {},
      truncate: true,
      restartIdentity: true
    });

    console.log(
      "🗑️ Produits supprimés"
    );

    for (const product of products) {

      await Product.create({

        title:
          product.title,

        category:
          product.category,

        description:
          product.description || "",

        price:
          Number(
            String(product.price)
              .replace(",", ".")
          ),

        image:
          product.image,

        stock: 50,

        sizes:
          product.sizes || null,

        colors:
          product.colors || null,

        blouse_sizes:
          product.blouseSizes || null

      });

      console.log(
        `✅ ${product.title}`
      );

    }

    console.log("");
    console.log(
      `🎉 ${products.length} produits importés`
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "❌ Erreur :",
      error
    );

    process.exit(1);

  }

}

importProducts();