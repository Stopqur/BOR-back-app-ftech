const express = require('express')

const { createRecipe, 
  getRecipes, 
  updateRecipe, 
  getOneRecipe, 
  createWishRecipe,
  filterSortRecipes
} = require('../controllers/recipe.controller')

const userRecipes = require('./userRecipe.routes')

const imgMiddleware = require('../middlewares/imgMiddleware')

const router = express.Router()

router.post('/new', imgMiddleware.single('img'), createRecipe)
router.get('/', getRecipes)
router.use('/user', userRecipes)
router.get('/by', filterSortRecipes)
router.get('/:id', getOneRecipe)
router.put('/:id', updateRecipe)
router.post('/', createWishRecipe)

module.exports = router