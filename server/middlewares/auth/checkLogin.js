//dependencies
const jwt = require('jsonwebtoken');
//internal imports
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

const checkLogin = catchAsync(async (req, res, next) => {
   //checking general login
   const cookies = Object.keys(req.cookies).length > 0 ? req.cookies : null;

   //TODO: There is a unhandled error on this check. Need to find a way out
   if (cookies[process.env.COOKIE_NAME]) {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
   } else {
      //check if user is logged in through oauth
      if (req.user) {
         next();
      } else {
         next(new AppError(401, 'You are not logged in please log in first'));
      }
   }
});

module.exports = checkLogin;
