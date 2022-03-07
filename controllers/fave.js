const express = require('express') //import the express module
const router = express.Router() // create an instance of an express app
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 8000
const db = require('../models')

/// GET favorite
router.get('/', async (req, res) => {
    try {
        const foundUser = await db.user.findOne({
            where: {
                id: res.locals.user.id
            }
        })
        const allFaves = await foundUser.getRecipes()
        // res.json(allFaves)
        res.render('food/favorites.ejs', {favorite: allFaves})
    } catch (error) {
        console.log(error)
        res.status(400).render('404.ejs')
    }
})


// Post /faves - create fave and redirect to /faves
router.post('/', async (req, res) => {
    console.log(res.locals.user.id)
    try {
        const foundUser = await db.user.findOne({
            where: {
                id: res.locals.user.id
            }
        })
        const [recipe, createdRecipe] = await db.recipe.findOrCreate({
            where: {
                name: req.body.name,
                image: req.body.image
            }
        })
        await foundUser.addRecipe(recipe)
        res.redirect('/faves')
    } catch (error) {
        console.log(error)
        res.status(400).render('404.ejs')
    }
})


router.delete('/:recipe_id', async (req, res) => {
    try {
        const foundFav = await db.recipe.findOne({
            where: {
                id: req.params.recipe_id
            }
        });
        await foundFav.destroy();
        res.redirect('/faves')
    } catch (error) {
        console.log(error)
        res.status(400).render('404.ejs')
    }
}) 





module.exports = router