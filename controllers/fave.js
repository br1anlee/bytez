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
        const allFaves = await db.savedrecipe.findAll()
        // res.json(allFaves)
        res.render('food/favorites.ejs', {favorite: allFaves})
    } catch (error) {
        console.log(error)
    }
})


// Post /faves - create fave and redirect to /faves
router.post('/', async (req, res) => {
    try {
        await db.savedrecipe.create({
            name: req.body.name,
            image: req.body.image,
            userId: res.locals.user
        })

        res.redirect('/faves')
    } catch (error) {
        res.status(400).render('404.ejs')
        console.log(error)
    }
})


router.delete('/', async (req, res) => {
    try {
        const foundFav = await db.savedrecipe.findOne({
            where: {id: req.params.id},
        });
        await foundFav.destory();
        res.redirect('/faves')
    } catch (error) {
        console.log(error)
    }
}) 





module.exports = router