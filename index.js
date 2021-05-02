const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Imports routs
const authRoute = require('./routes/auth');


dotenv.config();

//Connet to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }, 
    () => console.log('connected to db!')
);

//Middleware
app.use(express.json());

//Route Middllewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server running'));
