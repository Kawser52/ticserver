const express  = require('express')
const router = express.Router()


const {createProject, projectlist, projectById, read, removeProject, update, projectthumnail} = require('../controllers/projectController')
const {requireLogin, isAuth, isAdmin} = require('../controllers/authController')
const {userById} = require('../controllers/userCotroller');

router.get('/project', projectlist)
router.get('/project/:projectId', read)
router.get('/project/thumbnail/:projectId', projectthumnail)
router.delete('/project/:projectId/:userId', requireLogin, isAuth, isAdmin, removeProject)
router.put('/project/:projectId/:userId', requireLogin, isAuth, isAdmin, update)
router.post('/project/create/:userId', requireLogin, isAuth, isAdmin, createProject)
router.param('userId', userById)
router.param("projectId", projectById)

module.exports = router