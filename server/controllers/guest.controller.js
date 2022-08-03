const {
  addGuest,
  deleteGuest,
  getAvaiableFriends,
  getGuests,
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

controller.eventGuests = async (req, res) => {
  const user = req.user;

  const eventId = req.params.eventId;

  const guests = await getGuests(eventId, user);

  res.send(guests);
};

controller.availableFriends = async (req, res) => {
  const user = req.user;

  const date = req.params.date;

  const available = await getAvaiableFriends(date, user);

  res.send(available);
};
module.exports = controller;
