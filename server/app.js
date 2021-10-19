//dependencies
const express = require('express');
const dotenv = require('dotenv').config();
const GoogleStrategyConfig = require('./utils/auth/GoogleStrategyConfig');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');

//internal-imports
const { notFoundHandler, defaultErrorHandler } = require('./middlewares/errorHandlers');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');

//initialse express app
const app = express();

//enable cors
app.use(cors({ origin: true, credentials: true }));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewares
app.use(
   cookieSession({
      maxAge: process.env.EXPIRY_TIME,
      keys: [process.env.COOKIE_SECRET_KEY],
   })
);
app.use(cookieParser());

//initialise passport
app.use(passport.initialize());
app.use(passport.session());
//set static folder
if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
} else {
   app.use(express.static(path.join(__dirname, 'public')));
}

//root route of the app
app.get('/', (req, res, next) => {
   res.status(200).json({ status: 'success', message: 'This is the root of Authentication App backend' });
});

//routers
app.use('/api/user', authRouter);
app.use('/api/user', userRouter);

//error middlewares
app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

//export the app
module.exports = app;
