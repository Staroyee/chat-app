// IMPORT SEQUELIZE MODEL AND DATATYPES
const { Model, DataTypes } = require('sequelize');
// IMPORT SEQUELIZE CONNECTION
const sequelize = require('../config/connection');
// DEFINE THE CLASS
class ProductTag extends Model {}
// PRODUCTTAG MODEL DEFINITION
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);
// EXPORT THE PRODUCTTAG MODEL
module.exports = ProductTag;
