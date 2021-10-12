//dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

//internal imports
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/User');

//Signup function/Create user function
const signup = catchAsync(async (req, res, next) => {
   //hash the password
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   //insert users information to the database
   User.create({
      ...req.body,
      image: req.file.filename,
      password: hashedPassword,
   });

   //send the success response
   res.status(200).json({ status: 'sucess', message: 'User signedup successfully' });
});

const login = catchAsync(async (req, res, next) => {
   //get the user
   const user = await User.findOne({ email: req.body.email });

   if (user && user._id) {
      //check if the user password is valid
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
         //sign the token
         const userObjectForToken = {
            name: user.name,
            email: user.email,
            phone: user.phone,
         };
         const token = jwt.sign(userObjectForToken, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.EXPIRY_TIME,
         });
         res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.EXPIRY_TIME,
            httpOnly: true,
            secure: false, //TODO: need to make it false when we deploy the server to production
            sameSite: 'none',
         });
         res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
         });
      } else {
         next(new AppError(401, 'Authentication Error.'));
      }
   } else {
      next(new AppError(401, 'User not found'));
   }
});

//handle strategy for oauth
const handleStrategy = async function (accessToken, refreshToken, profile, done) {
   const { name, email, picture: image } = profile._json;
   const user = await User.findOne({ email: email });
   if (user && user._id) {
      done(null, user);
   } else {
      const newUser = await User.create({ name, email, image });
      done(null, newUser);
   }
};

module.exports = { signup, login, handleStrategy };
