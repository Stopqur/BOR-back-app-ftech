const express = require('express')

const { createRecipe, 
  getRecipes, 
  updateRecipe, 
  deleteRecipe,
  getOneRecipe, 
  getUserRecipes,
  getWishRecipes,
  createWishRecipe,
  filterSortRecipes
} = require('../controllers/recipe.controller')

const imgMiddleware = require('../middlewares/imgMiddleware')

const router = express.Router()

router.post('/new', imgMiddleware.single('img'), createRecipe)
router.get('/', getRecipes)
router.get('/user/:id', getUserRecipes)
router.get('/get', filterSortRecipes)
router.get('/:id', getOneRecipe)
router.put('/:id', updateRecipe)
router.delete('/:id', deleteRecipe)
router.post('/', createWishRecipe)



module.exports = router