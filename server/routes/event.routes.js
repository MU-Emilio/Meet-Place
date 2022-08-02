const express = require("express");
const router = express.Router();

// Controller
const { eventsList } = require("../controllers/event.controller");
const { userInfo } = require("../controllers/user.controller");

// Core
router.use("*", userInfo);
router.get("/", eventsList);

module.exports = router;
