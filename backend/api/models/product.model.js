const {
  DataTypes
} = require("sequelize");

const sequelize =
  require("../../config/sequelize.client");

const Product =
  sequelize.define(
    "Product",
    {
      id: {
        type:
          DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      title: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      category: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      description: {
        type:
          DataTypes.TEXT,
        allowNull: true
      },

      price: {
        type:
          DataTypes.DECIMAL(
            10,
            2
          ),
        allowNull: false
      },

      image: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      stock: {
        type:
          DataTypes.INTEGER,
        defaultValue: 0
      },

      sizes: {
        type:
          DataTypes.JSONB,
        allowNull: true
      },

      colors: {
        type:
          DataTypes.JSONB,
        allowNull: true
      },

      blouse_sizes: {
        type:
          DataTypes.JSONB,
        allowNull: true
      }

    },
    {
      tableName:
        "products",

      createdAt:
        "created_at",

      updatedAt:
        false
    }
  );

module.exports =
  Product;