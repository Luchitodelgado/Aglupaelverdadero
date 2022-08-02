
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const userMiddleware= require('../middlewares/userMiddleware')
const guestMiddleware= require('../middlewares/guestMiddleware')


router.get('/',userMiddleware, mainController.index); 


module.exports = router;
