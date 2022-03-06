# *Bytez*
## Overview

*Bytez* is a fullstack application that allows users to search over 50+ food recipes to save for the next time they are cooking! Users also have the ability to save their favorite recipes and view all of the saved recipes as well.


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
| GET | /register | renders the registration page
| GET | /login | renders the login page
| GET | /search | page that shows the results of the search dish
| GET | /search/:id | page that shows the recipe of the specific dish
| PUT | /faves | transfers all of the saved dish to \faves
| GET | /faves | displays all of the saved dish
| DELETE | /faves | deletes the selected saved dish
| GET | /comments | display all of the comments on the recipe
| PUT | /comments | transfers all of the comments to /comments
| DELETE | /comments | deletes the selected comment

---

## Wireframes


---
![ERD](/static/img/wireframe/IMG_0977.jpg)
![ERD](/static/img/wireframe/IMGerd_0976.jpg)
![ERD](/static/img/wireframe/IMG_0975.jpg)


---


## Tech Stack

- Postgres
- Express
- Node.js
- CSS/Bootstrap

---

## User Stories

- [X] As a logged in user, I want to be able to search up food recipes.
- [] As a logged in user, I want to be able to save the recipes that I like and delete the saved recipes.
- [X] As a logged in user, I want to be able to log out of my account.
- [X] As a logged in user, I want to be able to see the recipe instruction as well as the ingredients I need for the recipe.
- [X] As a user, I want to be able to log in or sign up for the website.
- [X] As an admin, I want to prevent users from using the functionality of the website if they are not logged in.
---

## MVP Goals
---
- [X] Welcome/Home page that renders login/sign up
- [X] User profile page that displays saved recipes
- [X] User will be able to search up recipes
- [X] User will be able to save recipes
- [] User will be able to delete the save recipes



## Stretch Goals
---
- [] User will be able to see videos about the recipe that they are looking for
- [] Use a second API that allows users to search for nearby supermarkets around their area
- [] Allow users to browse through the list of recipes from the category by clicking on the photo
- [] Allow users to upload photos of their dish
- [] Allow users to upload their own recipes to the website
- [] Allowing users to customize their profile page


## Reflection on this project
---
I had a very difficult time approaching this project because I was not comfortable with using sequelize at all. This project was definitely one of the hardest projects I have ever worked on. It may not be the best project but I am definitely proud of myself that I was able to finish this project. Thank you Paulina for helping!!