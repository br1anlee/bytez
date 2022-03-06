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

// Post route for Comments
router.post('/:recipe_id', async (req, res) => {
    let userId = res.locals.user.id
    let recipeId = req.params.recipe_id
    console.log(req.params)
    // console.log(req.params)
    await db.comment.findOrCreate({
    where: {
        userId: userId,
        }
    })
    let newComment = req.body.comment
    db.comment.create({
        comment: newComment,
        userId: userId,
        recipeId: recipeId
    })
    .then((comment) => {
        res.redirect(`/search/${recipeId}`)
    })
    .catch((error) => {
        console.log(error)
    })
})

// Get route for comments
router.get('/:recipe_id/comments', async (req, res) => {
    const foundComment = await db.comment.findAll({
        where: {
            recipeId: req.params.recipe_id
        }
    })
    res.render('food/comments.ejs', {comment: foundComment})
}) 



module.exports = router