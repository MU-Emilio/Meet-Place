const express = require("express");
const router = express.Router();

// Controller
const {
  userLogin,
  userRegister,
  viewerInfo,
  userDetailsByUsername,
  ownerDetails,
} = require("../controllers/user.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.post("/login", userLogin);
router.post("/register", userRegister);
router.use("*", getInformationUser);
router.get("/viewer", viewerInfo);
router.get("/username/:username", userDetailsByUsername);
router.get("/owner/:userId", ownerDetails);

module.exports = router;
