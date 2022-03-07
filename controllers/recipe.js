const express = require('express') //import the express module
const router = express.Router() // create an instance of an express app
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 8000
const db = require('../models')

// ROUTE FOR SEARCH
router.get('/', (req, res) => {
    try {
        let foodSearch = req.query.i
        let url = `https://themealdb.com/api/json/v1/1/filter.php?i=${foodSearch}`
        axios.get(url)
        .then(function (response) {
            const foodResults = response.data.meals
            res.render('food/foodList.ejs', {results: foodResults })
    })
}   catch (error) {
    res.render('404.ejs')
}


})
// ROUTE TO SPECIFIC RECIPE
router.get('/:recipe_id', async (req, res) => {
    try {
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
} catch (error) {
    console.log(error)
    }
})


// Post route for Comments
router.post('/:recipe_id', async (req, res) => {
    let recipeId = req.params.recipe_id
    await db.comment.create({
        comment: req.body.comment,
        userId: res.locals.user.id,
        recipeId: req.params.recipe_id
    })
//    res.redirect(`/search/${recipeId}`)
   res.redirect(`/search/${recipeId}/comments`)
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


// put route comments (edit route)
router.put('/:recipe_id/comments', async (req, res) => {
    let recipeId = req.params.recipe_id
    try {
        const foundComment = await db.comment.findOne({
            where:{
                recipeId: req.params.recipe_id
            }
        })
        await foundComment.update({
            comment: req.body.comment
        })
        await foundComment.save();
        res.redirect(`/search/${recipeId}/comments`)
    } catch (error){
        console.log(error)
    }
})


// get route comments (displays the information)
router.get('/:recipe_id/edit', async (req, res) => {
    try {
        const foundComment = await db.comment.findOne({
            where: {
                recipeId: req.params.recipe_id

            }
        })
        res.render('food/edit.ejs', {editComment: foundComment})
    } catch (error) {
        console.log(error)
    }
})


// Delete route for comments
router.delete('/:recipe_id/comments', async (req, res) => {
    let recipeId = req.params.recipe_id
    try {
        const foundComment = await db.comment.findOne({
            where:{recipeId: req.params.recipe_id}
        })
        await foundComment.destroy();
        res.redirect(`/search/${recipeId}/comments`)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router