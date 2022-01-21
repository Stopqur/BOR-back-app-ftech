const express = require('express')

const authRouter = require('./auth.routes')
const recipeRouter = require('./recipe.routes')

const router = express.Router()

router.use('/auth', authRouter)
// router.use('/mainPage', )
router.use('/recipe', recipeRouter)


module.exports = router