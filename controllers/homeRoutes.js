const router = require('express').Router();
const { Op } = require('sequelize');
const withAuth = require('../utils/withAuth');
const {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  Orders,
} = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all product and JOIN with category data
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });

    // // Testing for insomnia
    // res.json(productData);

    // TODO: Uncomment after view page is complete
    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));

    // // Pass serialized data and session flag into template
    res.render('homepage', {
      products,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Render an error page with a user-friendly message
    res.render('error', { error: 'An error occurred while fetching data.' });
  }
});

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
    // Render an error page with a user-friendly message
    console.log(err);
  }
});

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

// Product view :show product by id
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

// Category view ;show category by id
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

// WithAuth middleware to prevent access to account view
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        { 
          model: Orders,
          include: Product,
          include: User,
        },
      ],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      // User details & cart
      ...user,
      loggedIn: req.session.loggedIn,
    });
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
