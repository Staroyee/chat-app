// IMPORT SEQUELIZE MODEL AND DATATYPES
const { Model, DataTypes } = require('sequelize');
// IMPORT SEQUELIZE CONNECTION
const sequelize = require('../config/connection');
// DEFINE THE CLASS
class Orders extends Model {}
// ORDERS MODEL DEFINITION
Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    order_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'orders',
  }
);
// EXPORT THE ORDERS MODEL
module.exports = Orders;
