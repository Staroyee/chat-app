const router = require('express').Router();
const users = require('./userRoutes');
const products = require('./productRoutes')
const categories = require('./categoryRoutes');
const orders = require('./orderRoutes');

router.use('/categories', categories);
router.use('/products', products);
router.use('/users', users);
router.use('/orders', orders);

module.exports = router;
