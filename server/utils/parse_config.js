const Parse = require("parse/node");

const APP_ID = process.env.APP_ID;
const JS_KEY = process.env.JS_KEY;
const MASTER_KEY = process.env.MASTER_KEY;

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  APP_ID, // Application ID
  JS_KEY, // Javascript key
  MASTER_KEY //  Master key
);

module.exports = Parse;
