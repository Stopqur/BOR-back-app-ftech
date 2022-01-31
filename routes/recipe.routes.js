const express = require('express')

const { createRecipe, 
  getRecipes, 
  updateRecipe, 
  deleteRecipe,
  getOneRecipe 
} = require('../controllers/recipe.controller')

const imgMiddleware = require('../middlewares/imgMiddleware')

const router = express.Router()

router.post('/', imgMiddleware.single('img'), createRecipe)
router.get('/', getRecipes)
router.get('/:id', getOneRecipe)
router.put('/:id', updateRecipe)
router.delete('/:id', deleteRecipe)

module.exports = router