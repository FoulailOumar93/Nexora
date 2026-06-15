const {
  DataTypes
} = require("sequelize");

const sequelize =
  require("../../config/sequelize.client");

const Order =
  sequelize.define(
    "Order",
    {
      id: {
        type:
          DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      total: {
        type:
          DataTypes.DECIMAL(
            10,
            2
          ),
        allowNull: false
      },

      status: {
  type:
    DataTypes.ENUM(
      "pending",
      "paid",
      "preparing",
      "shipped",
      "delivered",
      "cancelled"
    ),
  defaultValue:
    "pending"
},

      user_id: {
        type:
          DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName:
        "orders",

      createdAt:
        "created_at",

      updatedAt:
        false
    }
  );

module.exports =
  Order;