const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();

const {userById} = require('../controllers/userCotroller')
const {requireLogin, isAuth, isAdmin} = require('../controllers/authController')



router.get('/secret/:userId', requireLogin, isAuth, isAdmin, (req, res)=>{
    res.json({
        user: req.profile
    })
})
router.param('userId', userById)



module.exports = router;