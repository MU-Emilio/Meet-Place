const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

class EventClass {
  static async getEvents(user) {
    try {
      const event_list = [];

      const Guests = Parse.Object.extend("Guests");
      const query1 = new Parse.Query(Guests);
      const query2 = new Parse.Query(Guests);

      if (!user) {
        return new BadRequestError("Unauthorized", 401);
      }

      query1.equalTo("guest", user);
      query1.equalTo("status", "accepted");

      query2.equalTo("guest", user);
      query2.equalTo("status", "pending");

      const compoundQuery = Parse.Query.or(query1, query2);

      compoundQuery.include(["event"]);
      const events = await compoundQuery.find();

      events.map((item) => {
        if (item.get("event")) {
          event_list.push({
            event: item.get("event"),
            status: item.get("status"),
          });
        }
      });

      return event_list;
    } catch (error) {
      return new BadRequestError(error.message, 404);
    }
  }

  static async addEvent(event, user) {
    const Event = Parse.Object.extend("Event");
    const newEvent = new Event();

    const event_info = event;

    try {
      // Format everything

      if (event_info.time === "") {
        event_info.time = "00:00";
      }

      const event_format = {
        title: event_info.title,
        date: {
          __type: "Date",
          iso: event_info.date + "T" + event_info.time + ":00.000Z",
        },
        description: event_info.description,
        location: event_info.location,
        owner: user,
        privacy: event_info.privacy,
      };

      const eventPointer = await newEvent.save(event_format, {
        success: (obj) => {
          return obj;
        },
        error: (err) => {
          return new BadRequestError(err.message, 409);
        },
      });

      const Guests = Parse.Object.extend("Guests");

      const Friends = Parse.Object.extend("Friends");

      const userPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: user.id,
      };

      const guests = [userPointer, ...event_info.guests];

      const promisses = [];

      if (guests) {
        guests.map((item) => {
          const guest = new Guests();

          const guestPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: item.objectId,
          };

          guest.set("event", eventPointer);
          guest.set("guest", guestPointer);

          guest.save();

          const query1 = new Parse.Query(Friends);
          const query2 = new Parse.Query(Friends);

          query1.equalTo("user1Id", userPointer);
          query1.equalTo("user2Id", guestPointer);

          query2.equalTo("user1Id", guestPointer);
          query2.equalTo("user2Id", userPointer);

          const compoundQuery = Parse.Query.or(query1, query2);

          const friendRelation = compoundQuery.first();

          promisses.push(friendRelation);
        });
      }

      const relations = await Promise.all(promisses);

      relations.map((item) => {
        if (item) {
          const closeness = item.get("closeness") + 1;

          item.set("closeness", closeness);

          item.save();
        }
      });

      return relations;
    } catch (error) {
      return new BadRequestError(error.message, 409);
    }
  }

  static async deleteEvent(eventObject, user) {
    try {
      // Delete event

      const Event = Parse.Object.extend("Event");
      const query = new Parse.Query(Event);

      query.equalTo("objectId", eventObject.objectId);

      const event = await query.first();

      if (event.get("owner").id === user.id) {
        Parse.Object.destroyAll(event);

        // Delete guests

        const Guests = Parse.Object.extend("Guests");
        const query2 = new Parse.Query(Guests);

        const eventPointer = {
          __type: "Pointer",
          className: "Event",
          objectId: event.id,
        };

        query2.equalTo("event", eventPointer);
        const guests = await query2.find();

        Parse.Object.destroyAll(guests);

        return eventPointer;
      } else {
        return new BadRequestError("Only owner can delete event");
      }
    } catch (error) {
      return new BadRequestError(error.message, 409);
    }
  }

  static async getEventInfo(eventId, user) {
    try {
      const Event = Parse.Object.extend("Event");
      const query = new Parse.Query(Event);

      query.equalTo("objectId", eventId);
      const eventDetails = await query.first();

      if (eventDetails.get("privacy")) {
        const eventPointer = {
          __type: "Pointer",
          className: "Event",
          objectId: eventId,
        };

        const guestPointer = {
          __type: "Pointer",
          className: "_User",
          objectId: user.id,
        };

        const Guests = Parse.Object.extend("Guests");
        const query2 = new Parse.Query(Guests);

        query2.equalTo("event", eventPointer);
        query2.equalTo("guest", guestPointer);

        const isGuest = await query2.find();

        if (isGuest.length < 1) {
          throw new BadRequestError("Event details are not available", 404);
        }
      }

      return eventDetails;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestError(error.message);
    }
  }

  static async getNumberOfPages(username, user) {
    try {
      const User = new Parse.User();
      const query1 = new Parse.Query(User);

      query1.equalTo("username", username);

      const user = await query1.first();

      const Guests = Parse.Object.extend("Guests");
      const query = new Parse.Query(Guests);

      const userPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: user.id,
      };

      query.equalTo("guest", userPointer);
      query.include("event");

      const events = await query.find();

      const events_pages = [];

      const chunkSize = 2;
      for (let i = 0; i < events.length; i += chunkSize) {
        const chunk = events.slice(i, i + chunkSize);
        events_pages.push(chunk);
      }

      const pages = events_pages.length;

      return {
        pages: pages.toString(),
        number_events: events.length.toString(),
      };
    } catch (error) {
      return new BadRequestError(error.message, 404);
    }
  }

  static async getEventsPage(username, page, user) {
    try {
      const User = new Parse.User();
      const query1 = new Parse.Query(User);

      query1.equalTo("username", username);

      const user = await query1.first();

      const Guests = Parse.Object.extend("Guests");
      const query = new Parse.Query(Guests);

      const userPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: user.id,
      };

      query.equalTo("guest", userPointer);
      query.include("event");

      const events = await query.find();

      events.sort((a, b) =>
        a.get("event").get("date") < b.get("event").get("date") ? 1 : -1
      );

      const events_pages = [];

      const chunkSize = 2;
      for (let i = 0; i < events.length; i += chunkSize) {
        const chunk = events.slice(i, i + chunkSize);
        events_pages.push(chunk);
      }

      const isLastPage = page == events_pages.length;

      return events_pages[page];
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

  static async getPendingInvitations(user) {
    try {
      const event_list = [];

      const Guests = Parse.Object.extend("Guests");
      const query = new Parse.Query(Guests);

      if (!user) {
        return new BadRequestError("Unauthorized", 401);
      }

      query.equalTo("guest", user);
      query.equalTo("status", "pending");
      query.include(["event"]);
      const events = await query.find();

      events.map((item) => {
        if (item.get("event")) {
          event_list.push(item.get("event"));
        }
      });

      return event_list;
    } catch (error) {
      return new BadRequestError(error.message, 404);
    }
  }

  static async changeInviteStatus(event, user, status) {
    try {
      const Guests = Parse.Object.extend("Guests");
      const query = new Parse.Query(Guests);

      const guestPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: user.id,
      };

      const eventPointer = {
        __type: "Pointer",
        className: "Event",
        objectId: event.objectId,
      };

      query.equalTo("guest", guestPointer);
      query.equalTo("event", eventPointer);

      const relation = await query.first();

      relation.set("status", status);
      relation.save();

      return relation;
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }
}

module.exports = EventClass;
