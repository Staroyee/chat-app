// IMPORT MODELS
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const Orders = require('./Orders');
const User = require('./User');

// DEFINE ALL ASSOCIATIONS BETWEEN MODELS
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

User.hasMany(Orders, {
  foreignKey: 'user_id',
});

Orders.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Orders.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

Product.hasMany(Orders, {
  foreignKey: 'product_id',
});

// EXPORT ALL MODELS WITH THEIR ASSOCIATIONS
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  Orders,
};
