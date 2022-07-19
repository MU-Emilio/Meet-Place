require("dotenv").config();
const Parse = require("parse/node");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const APP_ID = process.env.APP_ID;
const JS_KEY = process.env.JS_KEY;
const MASTER_KEY = process.env.MASTER_KEY;

app.use(cors());

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  APP_ID, // Application ID
  JS_KEY, // Javascript key
  MASTER_KEY //  Master key
);

// Request the Log in passing the email and password
app.post("/users/login", async (req, res) => {
  const body = req.body;

  try {
    const user = await Parse.User.logIn(body.username, body.password);
    res.send({ message: "User logged!", status: "success", payload: user });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message, status: "danger", payload: body });
  }
});

// Register the user passing the username, password and email
app.post("/users/register", async (req, res) => {
  const body = req.body;
  const user = new Parse.User();

  user.set("username", body.username);
  user.set("password", body.password);
  if (body.email == null) {
    res.status(400).send({
      message: "Cannot register with empty email",
      status: "danger",
      payload: body,
    });
    return;
  }
  user.set("email", body.email);

  try {
    await user.signUp();
    res
      .status(200)
      .send({ message: "User created!", status: "success", payload: body });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message, status: "danger", payload: body });
  }
});

app.use("*", async (req, res, next) => {
  const myToken = req.headers.authorization;
  if (!myToken) {
    req.userID = null;
    next();
  } else {
    const query = new Parse.Query(Parse.Session);
    query.include(["user"]);
    const results = await query.first({ sessionToken: myToken });
    req.user = results.get("user");
    next();
  }
});

app.use("/users", async (req, res, next) => {
  const friendList = [];

  const Friends = Parse.Object.extend("Friends");
  const query1 = new Parse.Query(Friends);
  const query2 = new Parse.Query(Friends);

  if (!req.user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const user = req.user;
    query1.equalTo("user1Id", user);
    query2.equalTo("user2Id", user);

    const compoundQuery = Parse.Query.or(query1, query2);

    compoundQuery.include("*");

    const friends = await compoundQuery.find();

    friends.map((item) => {
      if (item.get("user1Id").id == user.id) {
        friendList.push(item.get("user2Id"));
      } else {
        friendList.push(item.get("user1Id"));
      }
    });

    req.friends = friendList;
    next();
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  const user = req.user;
  const friends = req.friends;
  const friendIds = [];

  friends.map((friend, index) => {
    if (friend) {
      friendIds.push(friend.id);
    }
  });

  const query = new Parse.Query(Parse.User);
  query.notEqualTo("objectId", user.id);
  const users = await query.find();

  const usersNotFriends = [];

  users.map((item, index) => {
    if (!friendIds.includes(item.id)) {
      usersNotFriends.push(item);
    }
  });

  res.send(usersNotFriends);
});

app.get("/viewer", async (req, res) => {
  const userID = req.user.id;
  if (!userID) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", userID);
    const userObject = await query.first();
    res.send(userObject);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get("/events", async (req, res) => {
  const event_list = [];

  const Guests = Parse.Object.extend("Guests");
  const query = new Parse.Query(Guests);

  if (!req.user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const user = req.user;
    query.equalTo("guest", user);
    query.include(["event"]);
    const events = await query.find();

    events.map((item) => {
      event_list.push(item.get("event"));
    });

    res.send(event_list);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get("/friends", async (req, res) => {
  const friendList = [];

  const Friends = Parse.Object.extend("Friends");
  const query1 = new Parse.Query(Friends);
  const query2 = new Parse.Query(Friends);

  if (!req.user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const user = req.user;
    query1.equalTo("user1Id", user);
    query2.equalTo("user2Id", user);

    const compoundQuery = Parse.Query.or(query1, query2);

    compoundQuery.include("*");

    const friends = await compoundQuery.find();

    friends.map((item) => {
      if (item.get("user1Id").id == user.id) {
        friendList.push(item.get("user2Id"));
      } else {
        friendList.push(item.get("user1Id"));
      }
    });

    res.send(friendList);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.post("/friend", async (req, res) => {
  const Friends = Parse.Object.extend("Friends");

  const friend = new Friends();

  try {
    const userPointer = {
      __type: "Pointer",
      className: "_User",
      objectId: req.user.id,
    };

    const friendPointer = {
      __type: "Pointer",
      className: "_User",
      objectId: req.body.userCard.id,
    };

    // Check if already friends

    const query1 = new Parse.Query(Friends);
    const query2 = new Parse.Query(Friends);

    query1.equalTo("user1Id", userPointer);
    query1.equalTo("user2Id", friendPointer);

    query2.equalTo("user1Id", friendPointer);
    query2.equalTo("user2Id", userPointer);

    const compoundQuery = Parse.Query.or(query1, query2);

    const isFriend = await compoundQuery.find();

    if (isFriend.length > 0) {
      res.send(`Already Friends`);
    } else {
      friend.set("user1Id", userPointer);
      friend.set("user2Id", friendPointer);

      friend.save();

      res.send(`${req.user.username} added ${req.body.username}`);
    }
    return;
  } catch (error) {
    console.log(error.message);
    res.status(409).set({ message: error.message });
  }
});

module.exports = app;
