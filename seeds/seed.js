const sequelize = require('../config/connection');
const { User, Product, Category } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create({
      ...user,
    });
  }

  for (const category of categoryData) {
    await Category.create({
      ...category,
    });
  }
  
  for (const product of productData) {
    await Product.create({
      ...product,
    });
  }

  
  process.exit(0);
};

seedDatabase();