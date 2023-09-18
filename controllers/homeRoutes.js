const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
const { Product, Category, Tag, ProductTag, User, Order } = require('../models');

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

        // Testing for insomnia
        res.json(productData);

        // TODO: Uncomment after view page is complete
        // Serialize data so the template can read it
        //const products = productData.map((product) => product.get({ plain: true }));


        // // Pass serialized data and session flag into template
        // res.render('homepage', {
        //     products
        // });

    } catch (err) {
        // Render an error page with a user-friendly message
        res.render('error', { error: 'An error occurred while fetching data.' });
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

        const products = productData.get({ plain: true });

        res.render('products', {
            ...products
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Category view ;show category by id
router.get('/categories/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }]
        });

        const categories = categoryData.get({ plain: true });

        res.render('categories', {
            ...categories
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// WithAuth middleware to prevent access to account view
router.get('/account', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Order }],
        });

        const user = userData.get({ plain: true });

        // Check if session expired
        if (req.session.loggedIn) {
            res.render('account', {
                // User details & cart
                ...user,
            });
        }

        res.redirect('/');
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