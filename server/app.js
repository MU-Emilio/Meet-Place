const Parse = require('parse/node');
const express = require('express')
const app = express()
app.use(express.json());

Parse.serverURL = 'https://parseapi.back4app.com'; 
Parse.initialize(
  'yfMNoZWBaXbFbmwoo9xOGWwraxRQtIKOqoW0pEkJ', // Application ID
  'MzA9OJbSEboIaCBImjZFWd0FbsdNsUVtHWvO6IIX', // Javascript key
  'LmLxVrYCktqVbfkooRkw15UTZngbZ0yiFmmk2ObY' //  Master key
);

app.get('/', (req, res) => {
    res.json({"ping" : "pong"})
})

// Request the Log in passing the email and password
app.post('/users/login', async(req, res) => {
    let infoUser = req.body;
    
    try{
      let user = await Parse.User.logIn(infoUser.usernameLogin, infoUser.passwordLogin)
      res.send({ loginMessage: "User logged!", RegisterMessage: '', typeStatus: "success",  infoUser: infoUser });
    } catch (error){
      res.send({ loginMessage: error.message, RegisterMessage: '', typeStatus: "danger",  infoUser: infoUser});
    }
  });

// Register the user passing the username, password and email
app.post('/users/register', async(req, res) => {
    let infoUser = req.body;    
    let user = new Parse.User();
  
    user.set("username", infoUser.usernameRegister);
    user.set("password", infoUser.passwordRegister);
    user.set("email", infoUser.emailRegister);
  
    try{
      await user.signUp();
      res.send({ loginMessage : '', RegisterMessage: "User created!", typeStatus: "success",  infoUser: infoUser});
    } catch (error) {
      res.send({ loginMessage : '', RegisterMessage: error.message, typeStatus: "danger",  infoUser: infoUser});
    }
  });

module.exports = app;