//dependencies
const mongoose = require('mongoose');

//create user schema
const userSchema = mongoose.Schema(
   {
      name: String,
      bio: String,
      phone: String,
      email: { type: String, trim: true },
      password: String,
      image: String,
   },
   { timestamps: true }
);

//create User model
const User = mongoose.model('user', userSchema);

//export thte model
module.exports = User;
