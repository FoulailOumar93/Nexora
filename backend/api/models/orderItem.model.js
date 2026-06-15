const {
  DataTypes
} = require("sequelize");

const sequelize =
  require("../../config/sequelize.client");

const OrderItem =
  sequelize.define(
    "OrderItem",
    {
      id: {
        type:
          DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      order_id: {
        type:
          DataTypes.INTEGER,
        allowNull: false
      },

      product_id: {
        type:
          DataTypes.INTEGER,
        allowNull: false
      },

      title: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      image: {
        type:
          DataTypes.STRING,
        allowNull: true
      },

      quantity: {
        type:
          DataTypes.INTEGER,
        allowNull: false
      },

      price: {
        type:
          DataTypes.DECIMAL(
            10,
            2
          ),
        allowNull: false
      },

      selected_size: {
        type:
          DataTypes.STRING,
        allowNull: true
      },

      selected_color: {
        type:
          DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName:
        "order_items",

      timestamps:
        false
    }
  );

module.exports =
  OrderItem;