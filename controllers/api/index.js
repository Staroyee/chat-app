const router = require('express').Router();
const users = require('./userRoutes');
const products = require('./productRoutes')

router.use('/products', products)
router.use('/users', users);

module.exports = router;
