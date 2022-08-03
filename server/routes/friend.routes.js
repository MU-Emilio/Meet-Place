const express = require("express");
const router = express.Router();

// Controller
const {} = require("../controllers/friend.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);

module.exports = router;
