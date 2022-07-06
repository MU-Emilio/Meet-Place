require('dotenv').config()
const Parse = require('parse/node');
const express = require('express')
const app = express()
app.use(express.json());
const APP_ID = process.env.APP_ID;
const JS_KEY = process.env.JS_KEY;
const MASTER_KEY = process.env.MASTER_KEY;

Parse.serverURL = 'https://parseapi.back4app.com'; 
Parse.initialize(
  APP_ID, // Application ID
  JS_KEY, // Javascript key
  MASTER_KEY //  Master key
);

// Request the Log in passing the email and password
app.post('/users/login', async(req, res) => {
    const payload = req.body;
    
    try{
      const user = await Parse.User.logIn(payload.usernameLogin, payload.passwordLogin)
      res.send({ message: "User logged!", status: "success",  payload: payload });
    } catch (error){
      res.send({ message: error.message, status: "danger",  payload: payload});
    }
  });

// Register the user passing the username, password and email
app.post('/users/register', async(req, res) => {
    const payload = req.body;    
    const user = new Parse.User();
  
    user.set("username", payload.usernameRegister);
    user.set("password", payload.passwordRegister);
    user.set("email", payload.emailRegister);
  
    try{
      await user.signUp();
      res.send({ message: "User created!", status: "success",  payload: payload});
    } catch (error) {
      res.send({ message: error.message, status: "danger",  payload: payload});
    }
  });

module.exports = app;