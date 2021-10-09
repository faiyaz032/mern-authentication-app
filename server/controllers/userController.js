const catchAsync = require('../utils/catchAsync');

const getUsers = catchAsync((req, res, next) => {
   res.status(200).json({ status: 'success', message: 'API of get users' });
});

module.exports = { getUsers };
