const {
  DataTypes
} = require("sequelize");

const sequelize =
  require("../../config/sequelize.client");

const User =
  sequelize.define(
    "User",
    {
      id: {
        type:
          DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      firstName: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      lastName: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      email: {
        type:
          DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      role: {
        type:
          DataTypes.ENUM(
            "user",
            "admin"
          ),
        defaultValue:
          "user"
      },

      phone: {
        type:
          DataTypes.STRING(30),
        allowNull: true
      },

      address: {
        type:
          DataTypes.STRING,
        allowNull: true
      },

      postal_code: {
        type:
          DataTypes.STRING(20),
        allowNull: true
      },

      city: {
        type:
          DataTypes.STRING(100),
        allowNull: true
      },

      country: {
        type:
          DataTypes.STRING(100),
        allowNull: true
      },

      avatar: {
        type:
          DataTypes.STRING,
        allowNull: true
      },

      reset_password_token: {
        type:
          DataTypes.TEXT,
        allowNull: true
      },

      reset_password_expires: {
        type:
          DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName:
        "users",

      createdAt:
        "created_at",

      updatedAt:
        false
    }
  );

module.exports =
  User;