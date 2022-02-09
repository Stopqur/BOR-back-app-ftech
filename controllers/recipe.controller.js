const { Op } = require("sequelize");

const db = require('../models')

exports.createRecipe = async(req, res) => {
  try {
    if(req.file === undefined) {
      const { title, description, cookingSteps, user_id, complexity, cookingTime} = req.body
      const recipe = await db.recipes.create({ title, description, user_id, img: '', complexity, cookingTime })
      const steps = cookingSteps.map(async item => {
        await db.cooking_steps.create({name: item.name, recipe_id: recipe.id})
      })
      res.json(recipe)
    } 
    else if(req.file !== undefined) {
      const img = req.file.filename
      res.json(img)
    }
  } catch(e) {
    res.status(400).json({ message: e})
  }
}         

exports.updateRecipeImg = async(req, res) => {
  try{
    const recipe = await db.recipes.findOne({ where: {id: req.body.id}})
    const newRecipe = await recipe.update({img: req.body.img})
    res.json(newRecipe)
  } catch(e) {
    res.status(400).json({message: e})
  }
}

exports.updateRecipe = async (req, res) => {
  try { 
    const recipe = await db.recipes.findOne( { where: { id: req.params.id }})
    const newRecipe = await recipe.update({
      title: req.body.title,
      description: req.body.description,
      complexity: req.body.complexity,
      cookingTime: req.body.cookingTime,
      cooking_steps: req.body.cookingSteps
    })
    res.json(newRecipe)
  } catch(e) {
    res.status(400).json({ message: e })
  }
}

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await db.recipes.findOne({ where: { id: req.query.recipeId}})
    const steps = await db.cooking_steps.findAll({where: {recipe_id: recipe.id}})
    steps.map(async(step) => {
      await step.destroy()
    })
    recipe.destroy()
    const userRecipes = await db.recipes.findAll( {include: [db.cooking_steps.name]})
    res.json(userRecipes)
  } catch(e) {
    res.status(400).json({ message: "Recipe was not deleted!"})
  }
}

exports.getWishRecipes = async (req, res) => {
  try {
    const user = await db.users.findOne({where: {id: req.params.id}})
    const wishRecipes = await user.getRecipe({include: [db.cooking_steps.name]})
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
      const wishRecipe = await db.users_recipes.findOne({where: {recipe_id: req.body.recipe_id}})
      wishRecipe.destroy()
      res.json(wishRecipe)  
      }
    res.json(wishRecipe)
  } catch(e) {
    res.status(400).json({message: e})
  }
}

exports.getRecipes = async (req, res) => {
  if(Object.entries(req.query).length === 0 && Object.entries(req.params).length === 0) {
    try {
      const recipes = await db.recipes.findAll({ include: [db.cooking_steps.name] })
      res.json(recipes)
    } catch(err) {
      res.status(400).json({message: err})
    }
  }
  else if (Object.entries(req.params).length > 0 && Object.entries(req.query).length === 0) {
    try {
      const recipes = await db.recipes.findAll({ where: {user_id: req.params.id}, include: [db.cooking_steps.name]})
      res.json(recipes)
    } catch(e) {
      res.status(400).json({message: e})
    }
  }
  else if (Object.entries(req.query).length > 0) {
    const obj = {}
    for(let [paramName, paramValue] of Object.entries(req.query)) {
      if(paramName === 'sortBy' ) {
        obj.order = []
        obj.order = [[req.query.sortBy, req.query.sortOrder]]
      }
      else if(paramName === 'complexity' || paramName === 'cookingTime') {
        obj.where = {}
        obj.where[paramName] = {}
        obj.where[paramName][Op.between] = [paramValue[0], paramValue[1]]
      }
    obj.include = [db.cooking_steps.name]
    }
    try {
      const sortRecipes = await db.recipes.findAll(obj)
      res.json(sortRecipes)
    } catch(e) {
      res.status(400).json({'Querymessage': e})
    }
  }
}