const {getUserRecipes, deleteRecipe } = require('../controllers/recipe.controller')

const express = require('express')

const router = express.Router()

router.get('/:id', getUserRecipes)
router.delete('/:id/', deleteRecipe)

module.exports = router