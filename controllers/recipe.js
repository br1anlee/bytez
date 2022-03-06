const express = require('express') //import the express module
const router = express.Router() // create an instance of an express app
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 8000
const db = require('../models')

// ROUTE FOR SEARCH
router.get('/', (req, res) => {
    let foodSearch = req.query.i
    let url = `https://themealdb.com/api/json/v1/1/filter.php?i=${foodSearch}`
    axios.get(url)
    .then(function (response) {
        const foodResults = response.data.meals
        res.render('food/foodList.ejs', {results: foodResults })
    })
})
// ROUTE TO SPECIFIC RECIPE
router.get('/:recipe_id', async (req, res) => {
    userId = res.locals.user.id
    const recipeId = req.params.recipe_id
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    axios.get(url)
    .then(async function (response) {
        const recipe = await db.recipe.findAll({
            where: {name: recipeId},
            include: [db.comment]
        })
        let recipeData = response.data.meals
        res.render('food/recipe.ejs', {foodId: recipeData})
    })
})

/// GET favorite
router.get('/faves', (req, res) => {
    res.send('show me faves')
})


// Post /faves - create fave and redirect to /faves
router.post('/faves', async (req, res) => {
    try {
        await db.savedrecipe.create({
            name: req.body.name,
            image: req.body.image
        })

        res.redirect('/faves')
    } catch (error) {
        console.log(error)
    }
})



module.exports = router