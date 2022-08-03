const {
  addGuest,
  deleteGuest,
  getAvaiableFriends,
} = require("../models/GuestClass");

controller = {};

controller.newGuest = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const guestObject = req.body.event;

  const response = await addGuest(event, guestObject);

  res.send(response);
};

controller.eraseGuest = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const guestObject = req.body.event;

  const response = await deleteGuest(event, guestObject);

  res.send(response);
};

controller.availableFriends = async (req, res) => {
  const user = req.user;

  const date = req.params.date;

  const available = await getAvaiableFriends(date, user);

  res.send(available);
};
module.exports = controller;
