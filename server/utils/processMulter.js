//dependencies
const multer = require('multer');
const path = require('path');

//Set the the image upload folder
const UPLOAD_FOLDER = `${__dirname}/../public/uploads/images/`;

const processMulter = function () {
   // create the multer storage
   const storage = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, UPLOAD_FOLDER);
      },
      filename: (req, file, cb) => {
         const extname = path.extname(file.originalname);
         const fileName = file.originalname.replace(extname, '').toLowerCase().split(' ').join('-') + '-' + Date.now();
         const fullFileName = `${fileName}${extname}`;
         cb(null, fullFileName);
      },
   });

   //prepare the multer upload object
   const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
         const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
         if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
         } else {
            cb('There was an error filtering the file mimetypes');
         }
      },
   });

   //return the upload object
   return upload;
};

module.exports = processMulter;
