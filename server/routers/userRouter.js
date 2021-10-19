//dependencies
const express = require('express');
const { getUsers, editUser } = require('../controllers/userController');
const checkLogin = require('../middlewares/auth/checkLogin');

//initialise the router
const router = express.Router();

//get the users
router.get('/', getUsers);
router.patch('/', checkLogin, editUser);

module.exports = router;
