//dependencies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { handleStrategy } = require('../../controllers/AuthController');
const User = require('../../models/User');

passport.serializeUser(async (user, done) => {
   done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findOne({ _id: id });
   done(null, user);
});

passport.use(
   new GoogleStrategy(
      {
         //options
         callbackURL: process.env.GOOGLE_REDIRECT_URL,
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      handleStrategy
   )
);
