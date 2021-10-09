//dependencies
const bcrypt = require('bcrypt');

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

module.exports = { signup };
