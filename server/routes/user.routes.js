const express = require("express");
const router = express.Router();

// Controller
const {
  userLogin,
  userRegister,
  userInfo,
  viewerInfo,
  userDetailsByUsername,
  ownerDetails,
  getFriends,
  getNotFriends,
} = require("../controllers/user.controller");

// Core
router.post("/login", userLogin);
router.post("/register", userRegister);
router.use("*", userInfo);
router.get("/viewer", viewerInfo);
router.get("/:username", userDetailsByUsername);
router.get("/owner/:userId", ownerDetails);
// router.get("/friends", getFriends);
// router.get("/friends/notFriends", getNotFriends);

module.exports = router;
