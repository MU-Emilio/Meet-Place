const express = require("express");
const router = express.Router();

// Controller
const { newFriend } = require("../controllers/friend.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.use("/addFriend", newFriend);

module.exports = router;
