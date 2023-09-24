// IMPORT EXPRESS ROUTER
const router = require('express').Router();
// IMPORT OP SEQUELIZE OP OPERATOR
const { Op } = require('sequelize');
// IMPORT WITHAUTH UTIL FUNCTION
const withAuth = require('../utils/withAuth');
// IMPORT MODELS
const { Product, Category, User, Orders } = require('../models');

// ROUTE TO RENDER THE HOMEPAGE
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });
    const products = productData.map((product) => product.get({ plain: true }));
    res.render('homepage', {
      products,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.render('error', { error: 'An error occurred while fetching data.' });
  }
});

// ROUTE TO RENDER THE SEARCH PAGE BASED ON USER INPUT
router.get('/search/:searchTerm', async (req, res) => {
  try {
    const productData = await Product.findAll({
      where: {
        product_name: {
          [Op.like]: `%${req.params.searchTerm}%`,
        },
      },
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });
    const products = productData.map((product) => product.get({ plain: true }));
    res.render('allProducts', {
      products,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
  }
});

// ROUTE TO RENDER THE ALLPRODUCTS PAGE
router.get('/products', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });
    const products = productData.map((product) => product.get({ plain: true }));
    console.log(products);
    console.log('error');
    res.render('allProducts', {
      products,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO RENDER A SINGLE PRODUCT BY ID
router.get('/products/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });
    const product = productData.get({ plain: true });
    console.log(product);
    res.render('products', {
      ...product,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO RENDER THE SINGLECATEGORY PAGE FOR ACCESSORIES
router.get('/accessories', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(3, {
      include: [{ model: Product }],
    });

    const category = categoryData.get({ plain: true });
    res.render('singleCategory', {
      ...category,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO RENDER THE SINGLECATEGORY PAGE FOR EQUIPMENT
router.get('/equipment', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(2, {
      include: [{ model: Product }],
    });

    const category = categoryData.get({ plain: true });
    res.render('singleCategory', {
      ...category,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO RENDER THE SINGLECATEGORY PAGE FOR SUPPLEMENTS
router.get('/supplements', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(1, {
      include: [{ model: Product }],
    });

    const category = categoryData.get({ plain: true });
    res.render('singleCategory', {
      ...category,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO RENDER THE USER PROFILE PAGE
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Orders,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = userData.get({ plain: true });
    console.log('userdata ', JSON.stringify(user, null, 2));
    res.render('profile', {
      username: user.user_name,
      address: user.address,
      email: user.email,
      phone: user.phone,
      orders: user.orders,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json(err);
  }
});

// ROUTE TO RENDER THE LOGIN/SIGNUP PAGE
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// ROUTE TO RENDER THE EDIT-USER PAGE
router.get('/edit-user', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      const user = dbUserData.get({ plain: true });
      console.log(user);
      res.render('edit-user', {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/cart', async (req, res) => {
  try {
    const productIds = JSON.parse(req.query.productIds || '[]');

    const productData = await Product.findAll({
      where: {
        id: productIds,
      },
    });

     // Add this line to check the fetched data
    const cartProducts = productData.map((product) => product.get({ plain: true }));
    console.log('Fetched products:', cartProducts);
    res.render('cart', { 
      cartProducts, 
      loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/checkout', withAuth, async (req, res) => {
  try {
    const { productIds } = req.body;
    const userId = req.session.user_id; // Get the user ID from the session

    // Calculate the order total based on product prices
    // You'll need to fetch the product prices from your database
    const orderTotal = 0; // Calculate the total

    // Create the order
    const order = await Orders.create({
      product_id: productIds, // You may need to adjust this depending on your data structure
      order_total: orderTotal,
      user_id: userId,
    });

   if (order) {
      // After creating the order, set req.session.loggedIn to true
      

      res.status(200).send('Order created successfully.');

      // Redirect the user back to the profile page
      res.redirect('/profile', {loggedIn: req.session.loggedIn});
    } else {
      res.status(500).send('Error creating the order.');
    }
  } catch (error) {
    console.error('Error creating the order:', error);
    res.status(500).send('Internal Server Error');
  }
});
// EXPORT ROUTES TO CONTROLLERS/INDEX.JS
module.exports = router;
