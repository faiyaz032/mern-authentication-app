//dependencies
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { notFoundHandler, defaultErrorHandler } = require('./middlewares/errorHandlers');

//internal imports
const userRouter = require('./routers/userRouter');

//initialise the express app
const app = express();

//enable cors
app.use(cors({ origin: true, credentials: true }));

//request parser
app.use(express.json());

//middlewares
app.use(cookieParser());

//root route of the app
app.get('/', (req, res, next) => {
   res.status(200).json({ status: 'success', message: 'This is the root of Authentication App backend' });
});

//routers
app.use('/api/users', userRouter);

//error middlewares
app.all('*', notFoundHandler);
app.use(defaultErrorHandler);

//export the app
module.exports = app;
