const { addFriend, deleteFriend } = require("../models/FriendClass");

controller = {};

controller.newFriend = async (req, res) => {
  const user = req.user;

  const friendObject = req.body.userCard;

  const response = await addFriend(user, friendObject);

  res.send(response);
};

controller.eraseFriend = async (req, res) => {
  const user = req.user;

  const friendObject = req.body.userCard;

  const response = await deleteFriend(user, friendObject);

  res.send(response);
};

module.exports = controller;
