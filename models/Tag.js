// IMPORT SEQUELIZE MODEL AND DATATYPES
const { Model, DataTypes } = require('sequelize');
// IMPORT SEQUELIZE CONNECTION
const sequelize = require('../config/connection.js');
// DEFINE THE CLASS
class Tag extends Model {}
// TAG MODEL DEFINITION
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);
// EXPORT THE TAG MODEL
module.exports = Tag;
