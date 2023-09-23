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

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Orders,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });
    console.log("userdata " , JSON.stringify(user, null, 2));

    res.render('profile', {
      username: user.user_name,
      address: user.address,
      email: user.email,
      phone: user.phone,
      orders: user.orders,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    console.error("An error occurred:", err);
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

router.get('/edit-user', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
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
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;