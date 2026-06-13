const Product =
  require(
    "../models/product.model"
  );
  
async function getProductById(
  req,
  res
) {

  try {

    const product =
      await Product.findByPk(
        req.params.id
      );

    if (!product) {

      return res
        .status(404)
        .json({
          message:
            "Produit introuvable"
        });

    }

    res.json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}

async function getProducts(
  req,
  res
) {

  try {

    const products =
      await Product.findAll();

    res.json(
      products
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

async function getProductById(
  req,
  res
) {

  try {

    const product =
      await Product.findByPk(
        req.params.id
      );

    if (!product) {

      return res
        .status(404)
        .json({

          message:
            "Produit introuvable"

        });

    }

    res.json(
      product
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

async function createProduct(
  req,
  res
) {

  try {

    const product =
      await Product.create(
        req.body
      );

    res.status(201).json(
      product
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

async function updateProduct(
  req,
  res
) {

  try {

    const product =
      await Product.findByPk(
        req.params.id
      );

    if (!product) {

      return res
        .status(404)
        .json({

          message:
            "Produit introuvable"

        });

    }

    await product.update(
      req.body
    );

    res.json(
      product
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

async function deleteProduct(
  req,
  res
) {

  try {

    const product =
      await Product.findByPk(
        req.params.id
      );

    if (!product) {

      return res
        .status(404)
        .json({

          message:
            "Produit introuvable"

        });

    }

    await product.destroy();

    res.json({

      message:
        "Produit supprimé"

    });

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

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct

};