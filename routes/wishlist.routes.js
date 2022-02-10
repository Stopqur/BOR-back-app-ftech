const express = require('express');

const {
  getWishRecipes,
  createWishRecipe,
} = require('../controllers/recipe.controller');

const router = express.Router();

router.get('/:id', getWishRecipes);
router.post('/:id', createWishRecipe);

module.exports = router;
