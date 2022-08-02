const {
  userLogin,
  userRegister,
  getUser,
  getViewer,
} = require("../models/UserClass");

controller = {};

controller.userLogin = async (req, res) => {
  const response = await userLogin(req.body);

  res.send(response);
};

controller.userRegister = (req, res) => {
  const response = userRegister(req.body);

  res.send(response);
};

controller.getUser = (req, res, next) => {
  req.user = getUser(req.headers.authorization);

  next();
};

controller.getViewer = (req, res) => {
  const user = req.user;
  res.send(getViewer(user));
};

controller;

module.exports = controller;
