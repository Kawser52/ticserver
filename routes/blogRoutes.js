const express = require('express')
const router = express.Router();

const {createBlog, bloglist, blogById, read, update, blogthumbnail, removeBlog} = require('../controllers/blogController')
const { requireLogin, isAuth, isAdmin} = require('../controllers/authController')
const {userById} = require('../controllers/userCotroller');



router.get('/blog', bloglist)
router.get('/blog/:blogId', read)
router.get('/blog/thumbnail/:blogId', blogthumbnail)
router.delete('/blog/:blogId/:userId', requireLogin, isAuth, isAdmin, removeBlog)
router.put('/blog/:blogId/:userId', requireLogin, isAuth, isAdmin, update)
router.post('/blog/create/:userId', requireLogin, isAuth,isAdmin, createBlog)  
router.param("userId", userById)
router.param("blogId", blogById)

module.exports = router;
