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
app.use(express.urlencoded());

//Through mongoose we create a new database & connect through mongoose//

//Configration Mongoose//

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/MyDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}, () => {
    //After database connected this message will appear//
    console.log('Database connected');
})

//Create a new Schema//
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//Create a new Model//
const User = mongoose.model('User', userSchema);



//Define Routes according to the proiject//

/*app.get("/",(req, res) =>{
    res.send("API SEND!")
})*/

//we need post request for login and register//

app.post("/login",(req, res) => {
    res.send("Login API SEND!")
})
 
app.post("/signup",(req, res) => {
    // res.send("Signup API SEND!")
    // console.log(req.body) => to show in network//

    const {name, email, password} = req.body;

    //If, user already registered. then either return a error or return user object//
    User.findOne({email : email},(err, user) => {
        if(user){
            res.send({message: "User already registered"})
        } else{
            //create user-object in mongodb with this name,email,password//
            const user = new User({
                name,
                email,
                password
            })
            //save user-object in mongodb//
            //When it store the details than maybe problem in connection that's why take a callby option in save method//
            user.save(err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "Registration successfull"})
                }
            })
        }
    })
})


//Create a new port//
app.listen(5000, () => {
    console.log("Server is running");
})

/*Run this file in terminal =>
  [$ node index.js] it gives Error [ERR_MODULE_NOT_FOUND]:
  so, we use [$ node --experimental-specifier-resolution=node index.js]*/

/*[(node:28352) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.]
    Overcome this error we have two solution =>
    1. either set strictQuery option to ture globally to suppress the warning
        =>mongoose.set('strictQuery', true);
    2. or set strictQuery option to false globally to prepare for the change
        =>mongoose.set('strictQuery', false); */

