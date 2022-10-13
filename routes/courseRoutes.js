const express = require('express')
const { requireLogin, isAuth, isAdmin } = require('../controllers/authController')
const router = express.Router()


const {createCourse, courseById, read, removeCourse, update, list, web, graph, thumbnail, digital} = require('../controllers/courseController')
const { userById } = require('../controllers/userCotroller')


router.get('/course', list)
router.get('/course/cat/digi', digital)
router.get('/course/cat/graph', graph)
router.get('/course/cat/web', web)
router.get('/course/:courseId', read)
router.get('/course/thumbnail/:courseId', thumbnail)
router.put('/course/:courseId/:userId', requireLogin, isAuth, isAdmin, update)
router.delete('/course/:courseId/:userId', requireLogin, isAuth, isAdmin, removeCourse)
router.post('/course/create/:userId', requireLogin, isAuth, isAdmin, createCourse)
router.param("userId", userById)
router.param("courseId", courseById)


module.exports= router