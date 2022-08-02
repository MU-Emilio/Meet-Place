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
  userFriends,
  notUserFriends,
} = require("../controllers/user.controller");

// Core
router.post("/login", userLogin);
router.post("/register", userRegister);
router.use("*", userInfo);
router.get("/viewer", viewerInfo);
router.get("/username/:username", userDetailsByUsername);
router.get("/owner/:userId", ownerDetails);
router.get("/friends", userFriends);
router.get("/friends/notFriends", notUserFriends);

module.exports = router;
