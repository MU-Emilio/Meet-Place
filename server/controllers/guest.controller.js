const { addGuest } = require("../models/GuestClass");

controller = {};

controller.newGuest = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const guestObject = req.body.event;

  const response = await addGuest(event, guestObject);

  res.send(response);
};

module.exports = controller;
