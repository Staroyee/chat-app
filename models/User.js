// IMPORT SEQUELIZE MODEL AND DATATYPES
const { Model, DataTypes } = require('sequelize');
// IMPORT SEQUELIZE CONNECTION
const sequelize = require('../config/connection');
// IMPORT BCRYPT
const bcrypt = require('bcrypt');
// DEFINE THE CLASS
class User extends Model {
  // CHECK PASSWORD AGAINST USER INPUT PASSWORD
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}
// USER MODEL DEFINITION
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    // HOOKS
    hooks: {
      // HOOK TO HASH PASSWORD BEFORE CREATION
      async beforeCreate(newUserPass) {
        newUserPass.password = await bcrypt.hash(newUserPass.password, 10);
        return newUserPass;
      },
      // HOOK TO HAS PASSWORD BEFORE UPDATING
      async beforeUpdate(updatedUserPass) {
        updatedUserPass.password = await bcrypt.hash(
          updatedUserPass.password,
          10
        );
        return updatedUserPass;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
// EXPORT THE USER MODEL
module.exports = User;