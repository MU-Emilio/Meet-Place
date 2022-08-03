const express = require("express");
const router = express.Router();

// Controller
const { newFriend, eraseFriend } = require("../controllers/friend.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.post("/addFriend", newFriend);
router.post("/deleteFriend", eraseFriend);

module.exports = router;
