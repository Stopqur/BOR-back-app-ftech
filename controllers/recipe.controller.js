const db = require('../models')

exports.createRecipe = async(req, res) => {
  try {
    if(!req.body.title) {
      const img = req.file.filename
      res.json({img})
    } else {
      const { title, description, cookingSteps, user_id, img, complexity} = req.body
      const recipe = await db.recipes.create({ title, description, user_id, img, complexity })
      const steps = cookingSteps.map(async item => {
        await db.cookingSteps.create({name: item.name, recipe_id: recipe.id})
      })
      res.json(recipe)
    }
  } catch(e) {
    res.status(400).json({ message: e})
  }
}

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await db.recipes.findAll({ include: [db.cookingSteps.name] })
    res.json(recipes)
  } catch(err) {
    res.status(400).json({message: err})
  }
}

exports.getUserRecipes = async(req, res) => {
  try {
    const recipes = await db.recipes.findAll({ where: {user_id: req.params.id}})
    res.json(recipes)
  } catch(e) {
    res.status(400).json({message: e})
  }
}

exports.getOneRecipe = async () => {
  try {
    const recipe = await db.recipes.findOne({where: {id: req.params.id}})
    res.json(recipe)
  } catch(e) {
    res.status(400).json({'error': e})
  }
}

exports.updateRecipe = async (req, res) => {
  try { 
    const recipe = await db.recipes.findOne( { where: { id: req.params.id }})
    const newRecipe = await recipe.update({
      cookingSteps: req.body.cookingSteps
    })
    res.json(newRecipe)
  } catch(e) {
    res.status(400).json({ message: e })
  }
}

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await db.recipes.findOne({ where: { id: req.params.id}, include: [db.cookingSteps.name]})
    const steps = await db.cookingSteps.findAll({where: {recipe_id: recipe.id}})
    steps.destroy()
    recipe.destroy()
    res.json(recipe)
  } catch(e) {
    res.status(400).json({ message: "Recipe was not deleted!"})
  }
}

exports.getWishRecipes = async (req, res) => {
  try {
    const user = await db.users.findOne({where: {id: req.params.id}})
    const wishRecipes = await user.getRecipe()
    res.json(wishRecipes)
  } catch(e) {
    res.status(400).json({message: e})
  }
}

exports.createWishRecipe = async (req, res) => {
  try {
    const recipe = await db.recipes.findOne({where: {id: req.body.recipe_id}})
    const user = await db.users.findOne({where: {id: req.body.user_id}})
    const wishRecipe = await user.addRecipe(recipe)
    if(wishRecipe === undefined) {
      const wishRecipe = await db.usersRecipes.findOne({where: {recipe_id: req.body.recipe_id}})
      wishRecipe.destroy()
      res.json(wishRecipe)  
      }
    res.json(wishRecipe)
  } catch(e) {
    res.status(400).json({message: e})
  }
}

exports.filterSortRecipes = async (req, res) => {
  try {
    if(req.query.complexity) {
      if(req.query.complexity !== 'ASC' && req.query.complexity !=='DESC') {
        const filterRecipes = await db.recipes.findAll({ where: {complexity: req.query.complexity}})
        res.json(filterRecipes)
      } else {
        const sortRecipes = await db.recipes.findAll({ order: [['complexity', req.query.complexity]]})
        res.json(sortRecipes)
      }
    }
    else if (req.query.title) {
      const sortRecipes = await db.recipes.findAll({order: [['title', req.query.title]]})
      res.json(sortRecipes)
    }
    else if (req.query.created) {
      const sortRecipes = await db.recipes.findAll({ order: [['createdAt', req.query.created]]})
      res.json(sortRecipes)
    }
  } catch(e) {
    res.status(400).json({'Querymessage': e})
  }
}