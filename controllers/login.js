const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()


router.get('/', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/', async (req, res)=>{
    const user = await db.user.findOne({where: {email: req.body.email}})
    if(!user) { // if user is not found in db
        console.log('User not found!')
        res.render('users/login.ejs', {error: 'Invalid email/password'})
    } else if(!bcrypt.compareSync(req.body.password, user.password)) { // found the user but the pw is wrong
        console.log('Incorrect Password')
        res.render('users/login.ejs', {error: 'Invalid email/password'})
    } else {
        console.log('logging in the user!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        res.cookie('userId', encryptedUserIdString)        
        res.redirect('/')
    }
 })



module.exports = router