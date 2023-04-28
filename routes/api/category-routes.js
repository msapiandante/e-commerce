const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  // finds all categories and associated products
router.get('/', (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [{ model: Product }]
      });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//finds one category by id value and associated products. 
router.get('/:id', (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product}]
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//creates a new category 
router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

//delete category by its `id` value
router.delete('/:id', (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
