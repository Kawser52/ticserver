const express = require('express')
const router = express.Router();

const {createStory, storyList, storyById, read, update, removeStory, storyPicture} = require('../controllers/storyController')
const { requireLogin, isAuth, isAdmin} = require('../controllers/authController')
const {userById} = require('../controllers/userCotroller');



router.get('/sstory', storyList)
router.get('/sstroy/:blogId', read)
router.get('/sstroy/thumbnail/:sstroyId', storyPicture)
router.delete('/sstroy/:sstroyId/:userId', requireLogin, isAuth, isAdmin, removeStory)
router.put('/sstroy/:blogId/:userId', requireLogin, isAuth, isAdmin, update)
router.post('/sstroy/create/:userId', requireLogin, isAuth,isAdmin, createStory)  
router.param("userId", userById)
router.param("sstroyId", storyById)

module.exports = router;
