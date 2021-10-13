//dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');

//create user schema
const userSchema = mongoose.Schema(
   {
      name: String,
      bio: String,
      phone: { type: String },
      email: { type: String, trim: true, unique: true },
      password: String,
      image: String,

      passwordResetToken: String,
      passwordResetExpires: Date,
   },
   { timestamps: true }
);

userSchema.methods.createPasswordResetToken = function () {
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
   console.log({ resetToken }, this.passwordResetToken);
   return resetToken;
};

//create User model
const User = mongoose.model('user', userSchema);

//export thte model
module.exports = User;
