// IMPORT SEQUELIZE MODEL AND DATATYPES
const { Model, DataTypes } = require('sequelize');
// IMPORT SEQUELIZE CONNECTION
const sequelize = require('../config/connection');
// DEFINE THE CLASS
class Category extends Model {}
// CATEGORY MODEL DEFINITION
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
// EXPORT THE CATEGORY MODEL
module.exports = Category;
