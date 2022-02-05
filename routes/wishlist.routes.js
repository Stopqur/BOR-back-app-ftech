const express = require('express')

const { getWishRecipes } = require('../controllers/recipe.controller')

const router = express.Router()

router.get('/:id', getWishRecipes)

module.exports = router