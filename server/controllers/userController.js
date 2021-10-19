const { compare } = require('bcrypt');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const getUsers = catchAsync(async (req, res, next) => {
   res.status(200).json({ status: 'success', message: 'API of get users' });
});

const editUser = catchAsync(async (req, res, next) => {
   //get the logged in user
   const user = await User.findOne({ email: req.user.email });

   if (req.body.name) {
      user.name = req.body.name;
   }

   if (req.body.email) {
      user.email = req.body.email;
   }

   if (req.body.bio) {
      user.bio = req.body.bio;
   }

   if (req.body.phone) {
      user.phone = req.body.phone;
   }

   if (req.body.newPassword) {
      //check if the given password is valid
      const isValidPassword = await compare(req.body.password, user.password);
      if (isValidPassword) {
         user.password = req.body.newPassword;
      } else {
         next(new AppError(401, 'Your given password is not valid'));
      }
   }

   //TODO: Need to update the image also

   //finally update the user
   await user.save();
   res.status(200).json({ status: 'success', message: 'User updated successfully' });
});

module.exports = { getUsers, editUser };
