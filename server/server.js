//dependencies
const mongoose = require('mongoose');

//internal imports
const app = require('./app');

//database conneciton
mongoose
   .connect(process.env.MONGODB_CONNECTION_STRING)
   .then(() => console.log(`App is sucessfully connected to the database`))
   .catch((error) => console.log(error));

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is alive on PORT ${PORT}`));
