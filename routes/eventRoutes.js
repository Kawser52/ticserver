const express = require('express')
const router = express.Router();

const {createEvent, eventById, eventlist, read, removeEvent, update, eventImages} = require('../controllers/eventConrtoller')
const { requireLogin, isAuth, isAdmin} = require('../controllers/authController')
const {userById} = require('../controllers/userCotroller')



router.get('/event', eventlist)
router.get('/event/:eventId', read)
router.get('/event/thumbnail/:eventId', eventImages)
router.delete('/event/:eventId/:userId', requireLogin, isAuth, isAdmin, removeEvent)
router.put('/event/:eventId/:userId', requireLogin, isAuth, isAdmin, update)
router.post('/event/create/:userId', requireLogin, isAuth,isAdmin, createEvent)  
router.param("userId", userById)
router.param("eventId", eventById)

module.exports = router;
