const db = require('../models')

exports.createRecipe = async(req, res) => {
    try {
        const { title, description, cookingSteps, user_id } = req.body
        const img = req.file.path
        const recipe = await db.recipes.create({ title, description, cookingSteps, user_id, img: img })
        res.json(recipe)
    } catch(e) {
        res.status(400).json({ message: e})
    }
}

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await db.recipes.findAll()
        res.json(recipes)
    } catch(err) {
        res.status(400).json({message: err})
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
        const recipe = await db.recipes.findOne({ where: { id: req.params.id}})
        recipe.destroy()
        res.json(recipe)
    } catch(e) {
        res.status(400).json({ message: "Recipe was not deleted!"})
    }
}