// IMPORT EXPRESS ROUTER
const router = require('express').Router();
// IMPORT MODELS
const { Category, Product } = require('../../models');

// ROUTE TO GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    if (!categories) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ROUTE TO GET A SINGLE CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id);
    if (!categories) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO CREATE A NEW CATEGORY BASED ON THE REQUEST BODY
router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO UPDATE A CATEGORY BY ITS ID VALUE USING THE REQUEST BODY DATA
router.put('/:id', async (req, res) => {
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categories[0]) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Successfully updated categories' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO DELETE A CATEGORY BY ITS ID VALUE
router.delete('/:id', async (req, res) => {
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categories) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//EXPORT ROUTES TO API/INDEX.JS
module.exports = router;
