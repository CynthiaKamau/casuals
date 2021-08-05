const express = require('express');
const app = express();
const dotenv = require('dotenv');
require("./dbconfig");

dotenv.config();

//Import Routes
const authRoute = require('./routes/auth')
const PORT = process.env.PORT || 3000;
const cookieOptions = {credentials:true, origin: process.env.URL || '*'};

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(PORT, () => console.log('Server up and running'));