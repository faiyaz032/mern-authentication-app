//dependencies
const express = require('express');
const { getUsers } = require('../controllers/userController');

//initialise the router
const router = express.Router();

router.get('/', getUsers);

module.exports = router;
