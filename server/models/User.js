//dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');
const bycrpt = require('bcrypt');

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
   return resetToken;
};

//hash the  password
userSchema.pre('save', async function (next) {
   //only run the function if the password is actually modified
   if (!this.isModified('password')) return next();
   this.password = await bycrpt.hash(this.password, 10);
   next();
});

//create User model
const User = mongoose.model('user', userSchema);

//export thte model
module.exports = User;
