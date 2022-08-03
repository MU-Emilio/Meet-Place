const express = require("express");
const router = express.Router();

// Controller
const {
  newFriend,
  eraseFriend,
  userFriends,
  notUserFriends,
} = require("../controllers/friend.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.get("/", userFriends);
router.get("/notFriends", notUserFriends);
router.post("/addFriend", newFriend);
router.post("/deleteFriend", eraseFriend);

module.exports = router;
