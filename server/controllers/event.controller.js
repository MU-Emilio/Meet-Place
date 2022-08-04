const {
  getEvents,
  addEvent,
  deleteEvent,
  getEventInfo,
  getNumberOfPages,
  getEventsPage,
  getPendingInvitations,
  acceptInvitationEvent,
} = require("../models/EventClass");

controller = {};

controller.eventsList = async (req, res) => {
  const user = req.user;

  const events = await getEvents(user);

  res.send(events);
};

controller.postEvent = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const eventObject = await addEvent(event, user);

  res.send(eventObject);
};

controller.eraseEvent = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const eventObject = await deleteEvent(event, user);

  res.send(eventObject);
};

controller.eventInformation = async (req, res) => {
  const user = req.user;

  const eventId = req.params.eventId;

  const eventObject = await getEventInfo(eventId, user);

  res.send(eventObject);
};

controller.eventsPages = async (req, res) => {
  const user = req.user;

  const username = req.params.username;

  const pages = await getNumberOfPages(username, user);

  res.send(pages);
};

controller.pageEvents = async (req, res) => {
  const user = req.user;

  const username = req.params.username;
  const page = req.params.page;

  const eventPage = await getEventsPage(username, page, user);

  res.send(eventPage);
};

controller.pendingEvents = async (req, res) => {
  const user = req.user;

  const eventsPendingList = await getPendingInvitations(user);

  res.send(eventsPendingList);
};

controller.acceptInvite = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const relation = await acceptInvitationEvent(event, user);

  res.send(relation);
};

module.exports = controller;
