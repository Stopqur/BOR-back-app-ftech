const express = require('express')

const { getRecipes, deleteRecipe } = require('../controllers/recipe.controller')

const router = express.Router()

router.get('/:id', getRecipes)
router.delete('/:id/', deleteRecipe)

module.exports = router