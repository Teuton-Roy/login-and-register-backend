//import express//
// const express = require('express'); => In general we are import like this//
// But here, I'm import like react. for this we have litile-bit change into package.json file("type":"module")//

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//Configration nodeJs//
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Through mongoose we create a new database & connect through mongoose//

//Configration Mongoose//

mongoose.connect('mongodb://localhost:27017/MyDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    //After database connected this message will appear//
    console.log('Database connected');
})
