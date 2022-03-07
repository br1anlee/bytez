# *Bytez*
## Overview

*Bytez* is a fullstack application that allows users to search food recipes to save for the next time they are cooking! Users also have the ability to save their favorite recipes and view all of the saved recipes as well. Users will be able to see cooking instructions and ingredients needed for the dish they are making!


---


## API that was used for this project
- The Meal DB

---

## ERD

![ERD](/static/img/erd.png)

---


## Routes

| Method | Path | Description |
| ---| ----------| ---|
| GET | / | renders the home page
| POST | /register | Register page and redirects to login page
| POST | /login | Login page and redirects to the home page
| GET | /search | page that shows the results of the search dish
| GET | /search/:id | page that shows the recipe of the specific dish
| PUT | /faves | transfers all of the saved dish to \faves
| GET | /faves | displays all of the saved dish
| DELETE | /faves | deletes the selected saved dish
| GET | /search/:id/comment | display all of the comments on the recipe
| POST | /search/:id/comment | adds new comments to the recipe comment page
| PUT | /search/:id/comment | updates the comments

---

## Wireframes


---
![ERD](/static/img/wireframe/IMG_0977.jpg)
![ERD](/static/img/wireframe/IMG_0976.jpg)
![ERD](/static/img/wireframe/IMG_0975.jpg)


---

## Code Highlight
---
```ruby
router.get('/', async (req, res) => {
    try {
        const foundUser = await db.user.findOne({
            where: {
                id: res.locals.user.id
            }
        })
        const allFaves = await foundUser.getRecipes()
        res.render('food/favorites.ejs', {favorite: allFaves})
    } catch (error) {
        console.log(error)
        res.status(400).render('404.ejs')
    }
})
```
---
```ruby
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
```


## Tech Stack
---
- Postgres
- Express
- Node.js
- CSS/Bootstrap

---

## User Stories

- [X] As a logged in user, I want to be able to search up food recipes.
- [X] As a logged in user, I want to be able to save the recipes that I like and delete the saved recipes.
- [X] As a logged in user, I want to be able to see the recipe instruction as well as the ingredients I need for the recipe.
- [X] As a user, I want to be able to log in or sign up for the website.
- [X] As a logged in user, I want to be able to log out of my account.
- [X] As an admin, I want to prevent users from using the functionality of the website if they are not logged in.
---

## MVP Goals
---
- [X] Welcome/Home page that renders login/sign up
- [X] User will be able to search up recipes
- [X] User will be able to see their saved recipes
- [X] User will be able to save recipes
- [X] User will be able to delete the save recipes
- [X] User will be able to comment on the recipe
- [X] User will be able to edit and delete the comments



## Stretch Goals
---
- [] User will be able to see videos about the recipe that they are looking for
- [] Use a second API that allows users to search for nearby supermarkets around their area
- [] Allow users to upload photos of their dish
- [] Allow users to upload their own recipes to the website
- [] Allowing users to customize their profile page
