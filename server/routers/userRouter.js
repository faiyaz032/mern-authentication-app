//dependencies
const express = require('express');
const passport = require('passport');
//internal imports
const { signup, login, forgetPassword, resetPassword } = require('../controllers/AuthController');
const checkLogin = require('../middlewares/auth/checkLogin');
const handleImageUpload = require('../middlewares/handleImageUpload');

//initialise the router
const router = express.Router();

//user authentication routes
router.post('/signup', handleImageUpload, signup);
router.post('/login', login);

//reset password routes
router.post('/forget-password', forgetPassword);
router.patch('/reset-password/:token', resetPassword);

router.get(
   '/auth/google',
   passport.authenticate('google', {
      scope: ['profile', 'email'],
   })
);

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res, next) => {
   res.redirect('/api/user/test');
});

router.get('/test', checkLogin, (req, res, next) => {
   res.send(`Hello I am ${req.user.name}. I've passed the middleware`);
});

module.exports = router;
