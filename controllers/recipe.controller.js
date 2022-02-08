const db = require('../models')
const { Op } = require("sequelize");


exports.createRecipe = async(req, res) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!')
  try {
    if(!req.body.title) {
      const img = req.file.filename
      res.json({img})
    } else {
      const { title, description, cookingSteps, user_id, img, complexity, cookingTime} = req.body
      const recipe = await db.recipes.create({ title, description, user_id, img, complexity, cookingTime })
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
    console.log(req.params.id)
    const recipes = await db.recipes.findAll({ where: {user_id: req.params.id}, include: [db.cookingSteps.name]})
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
    console.log(req.params.id)
    const recipe = await db.recipes.findOne({ where: { id: req.query.recipeId}})
    const steps = await db.cookingSteps.findAll({where: {recipe_id: recipe.id}})
    steps.map(async(step) => {
      await step.destroy()
    })
    recipe.destroy()
    const userRecipes = await db.recipes.findAll( {include: [db.cookingSteps.name]})
    res.json(userRecipes)
  } catch(e) {
    res.status(400).json({ message: "Recipe was not deleted!"})
  }
}

exports.getWishRecipes = async (req, res) => {
  try {
    const user = await db.users.findOne({where: {id: req.params.id}})
    const wishRecipes = await user.getRecipe({include: [db.cookingSteps.name]})
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
  let obj = {}
  
  for(let [paramName, paramValue] of Object.entries(req.query)) {
    if(Array.isArray(paramValue) && paramName === 'complexity') {
      obj.where = {}
      obj.order = []
      obj.order[Op.or] = []
      obj.where.complexity = {}
      obj.where.complexity[Op.between] = [paramValue[0], paramValue[1]]

    }
    else if(paramName === 'complexity' && req.query.complexity !== 'ASC' && req.query.complexity !== 'DESC') {
      obj.where = {}
      obj.where.complexity = {}
      obj.where.complexity[Op.between] = [paramValue[0], paramValue[2]]
    }
    else if (paramName === 'cookingTime') {
      obj.where = {}
      obj.where.cookingTime = {}
      obj.where.cookingTime[Op.between] = [paramValue[0], paramValue[1]]
    }
    else if(paramName === 'title' || paramName === 'createdAt' || (paramName === 'complexity')) {  
      obj.order = []
      obj.order[Op.or] = []
      obj.order = [[paramName, paramValue]]
    }
  }
  try {
    const sortRecipes = await db.recipes.findAll(obj)
    res.json(sortRecipes)
  } catch(e) {
    res.status(400).json({'Querymessage': e})
  }
}