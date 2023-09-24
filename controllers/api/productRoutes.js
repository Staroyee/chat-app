// IMPORT EXPRESS ROUTER
const router = require('express').Router();
// IMPORT MODELS
const { Product, Category, Tag, ProductTag } = require('../../models');

// ROUTE TO GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({ include: [Category, {
      model: Tag,
      through: ProductTag,
    }]
  });
    if(!products) {
      res.status(404).json({ message: 'No products found'});
      return;
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO GET A SINGLE PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const products = await Product.findByPk(req.params.id, { include: [Category, {
      model: Tag,
      through: ProductTag,
    }]
  });
    if(!products) {
      res.status(404).json({ message: 'No products found'});
      return;
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO CREATE A PRODUCT BASED ON THE REQUEST BODY
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds?.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// ROUTE TO UPDATE A PRODUCT BY ITS ID VALUE
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ROUTE TO DELETE A PRODUCT BY ITS ID VALUE
router.delete('/:id', async (req, res) => {
  try {
    const products = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!products) {
      res.status(404).json({ message: 'No products found with this id!'});
      return;
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT ROUTES TO API/INDEX.JS
module.exports = router;
