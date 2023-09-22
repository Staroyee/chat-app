const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const Orders = require('./Orders');
const User = require('./User');

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
  foreignKey: 'order_id',
});

Orders.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Orders.hasMany(Product, {
  foreignKey: 'product_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  Orders,
};
