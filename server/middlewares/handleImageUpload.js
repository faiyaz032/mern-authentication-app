//internal imports
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const processMulter = require('./../utils/processMulter');

//handle image upload middleware
const handleImageUpload = catchAsync((req, res, next) => {
   //get the upload object by calling process multer
   const upload = processMulter();

   //finally upload the image and check for the errors
   upload.single('image')(req, res, (error) => {
      if (error) {
         next(new AppError(500, error.message));
      } else {
         next();
      }
   });
});

module.exports = handleImageUpload;
