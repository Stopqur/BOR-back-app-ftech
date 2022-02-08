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

const userRecipes = require('./userRecipe.routes')

const imgMiddleware = require('../middlewares/imgMiddleware')

const router = express.Router()

router.post('/new', imgMiddleware.single('img'), createRecipe)
router.get('/', getRecipes)
router.use('/user', userRecipes)
// router.get('/user/:id', getUserRecipes)
router.get('/by', filterSortRecipes)
router.get('/:id', getOneRecipe)
router.put('/:id', updateRecipe)
// router.delete('/user/:id', deleteRecipe)
router.post('/', createWishRecipe)



module.exports = router