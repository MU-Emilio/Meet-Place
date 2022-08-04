const {
  getEvents,
  addEvent,
  deleteEvent,
  getEventInfo,
  getNumberOfPages,
  getEventsPage,
  getPendingInvitations,
  changeInviteStatus,
} = require("../models/EventClass");

const { getResponseOrError } = require("../utils/response_error");

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

  // const eventObject = await getEventInfo(eventId, user);

  const [response, error] = await getResponseOrError(
    async () => await getEventInfo(eventId, user)
  );

  if (error) {
    res.status(error.status).send(error.message);
    return;
  }

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

  const relation = await changeInviteStatus(event, user, "accepted");

  res.send(relation);
};

controller.rejectInvite = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const relation = await changeInviteStatus(event, user, "rejected");

  res.send(relation);
};

module.exports = controller;
