const express = require('express')
const router = express.Router();

const { requireLogin, isAuth, isAdmin} = require('../controllers/authController')
const {userById} = require('../controllers/userCotroller')
const {serviceCreate, serviceById, read, allservices, update, removeService} = require('../controllers/serviceController')

router.get('/service', allservices)
router.get('/service/:serviceId', read)
router.put('/service/:serviceId/:userId', requireLogin, isAuth, isAdmin, update)
router.delete('/service/:serviceId/:userId', requireLogin, isAuth, isAdmin, removeService)
router.post('/service/create/:userId', requireLogin, isAuth, isAdmin, serviceCreate)
router.param('userId', userById)
router.param("serviceId", serviceById)

module.exports = router