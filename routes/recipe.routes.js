const express = require('express')

const { createRecipe, 
  getRecipes, 
  updateRecipe, 
  createWishRecipe,
  updateRecipeImg
} = require('../controllers/recipe.controller')

const userRecipes = require('./userRecipe.routes')

const imgMiddleware = require('../middlewares/imgMiddleware')

const router = express.Router()

router.use('/user', userRecipes)
router.post('/new', imgMiddleware.single('img'), createRecipe)
router.post('/', createWishRecipe)
router.get('/', getRecipes)
router.put('/new', updateRecipeImg)
router.put('/:id', updateRecipe)

module.exports = router