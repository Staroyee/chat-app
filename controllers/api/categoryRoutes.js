const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Find all categories
  try {
    const categories = await Category.findAll({ include: [Product]});
    if(!categories) {
      res.status(404).json({ message: 'No categories found'});
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Find one category by its `id` value
  try {
    const categories = await Category.findByPk(req.params.id);
    if(!categories) {
      res.status(404).json({ message: 'No categories found'});
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Create a new category
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // Update a category by its `id` value
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!categories[0]) {
      res.status(404).json({ message: 'No categories found with this id!'});
      return;
    }
    res.status(200).json({ message: 'Successfully updated categories' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categories) {
      res.status(404).json({ message: 'No categories found with this id!'});
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
