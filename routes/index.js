const express = require('express');

const authRouter = require('./auth.routes');
const recipeRouter = require('./recipe.routes');
const wishlistRouter = require('./wishlist.routes');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/recipe', recipeRouter);
router.use('/wishlist', wishlistRouter);

module.exports = router;
