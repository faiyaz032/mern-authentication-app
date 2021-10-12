//dependencies
const express = require('express');
//internal imports
const { signup, login } = require('../controllers/AuthController');
const handleImageUpload = require('../middlewares/handleImageUpload');

//initialise the router
const router = express.Router();

//user authentication routes
router.post('/signup', handleImageUpload, signup);
router.post('/login', login);

module.exports = router;
