const router = require('express').Router();
const users = require('./userRoutes');
const products = require('./productRoutes')
const categories = require('./categoryRoutes');

router.use('/categories', categories);
router.use('/products', products);
router.use('/users', users);

module.exports = router;
