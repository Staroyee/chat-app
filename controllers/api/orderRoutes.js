const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
const { Product, Order, User } = require('../../models');

router.get('/', withAuth, async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Product, User] });
    if (!orders) {
      res.status(404).json({ message: 'No orders found' });
      return;
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/orders/:id', withAuth, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if(!order) {
        res.status(404).json({ message: 'No order found'});
        return;
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/:id', async (req, res) => {
    const data = req.body;
    try {
      const order = await Order.bulkCreate(data);
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(500).json({ success: false, err: err.message });
    }
  });

module.exports = router;