const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();


const {addcategory, list, update, read, catById, catRemove} = require('../controllers/categoryController')
const {requireLogin, isAuth, isAdmin} = require('../controllers/authController')
const {userById} = require('../controllers/userCotroller');

router.get('/category', list)
router.get('/category/:catId',  read)
router.delete('/category/:catId/:userId', requireLogin, isAuth, isAdmin, catRemove)
router.put('/category/:catId/:userId', requireLogin, isAuth, isAdmin, update)
router.post('/category/create/:userId', requireLogin, isAuth, isAdmin, addcategory)
router.param('userId', userById)
router.param('catId', catById)

module.exports = router