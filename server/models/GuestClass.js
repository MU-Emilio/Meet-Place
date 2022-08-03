const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

class GuestClass {
  static async addGuest(event, guestObject) {
    try {
      const event_info = event;

      const eventPointer = {
        __type: "Pointer",
        className: "Event",
        objectId: event_info.objectId,
      };

      const Guests = Parse.Object.extend("Guests");

      const guest_info = guestObject;
      const guest = new Guests();

      const guestPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: guest_info.objectId,
      };

      guest.set("event", eventPointer);
      guest.set("guest", guestPointer);

      await guest.save();

      return { guestPointer };
    } catch (error) {
      return new BadRequestError(error.message, 409);
    }
  }

  static async deleteGuest(event, guestObject) {
    try {
      const event_info = event;

      const eventPointer = {
        __type: "Pointer",
        className: "Event",
        objectId: event_info.objectId,
      };

      const guest_info = guestObject;

      const guestPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: guest_info.objectId,
      };

      const Guests = Parse.Object.extend("Guests");

      const query1 = new Parse.Query(Guests);
      const query2 = new Parse.Query(Guests);

      query1.equalTo("event", eventPointer);
      query1.equalTo("guest", guestPointer);

      query2.equalTo("guest", guestPointer);
      query2.equalTo("event", eventPointer);

      const compoundQuery = Parse.Query.or(query1, query2);

      const guestRelation = await compoundQuery.first();

      Parse.Object.destroyAll(guestRelation);

      return guestRelation;
    } catch (error) {
      return new BadRequestError(error.message, 409);
    }
  }

  static async getAvaiableFriends(date, user) {
    // Get user's friends
    const friendList = [];

    const Friends = Parse.Object.extend("Friends");
    const query1 = new Parse.Query(Friends);
    const query2 = new Parse.Query(Friends);

    if (!user) {
      return new BadRequestError("Unauthorized", 401);
    }
    try {
      query1.equalTo("user1Id", user);
      query2.equalTo("user2Id", user);

      const compoundQuery = Parse.Query.or(query1, query2);

      compoundQuery.includeAll();

      const friends = await compoundQuery.find();

      friends.map((item) => {
        if (item.get("user1Id").id == user.id) {
          friendList.push(item.get("user2Id"));
        } else {
          friendList.push(item.get("user1Id"));
        }
      });

      // Get relation of Event - Guest from Guests table for each friend

      const promisses = [];

      friendList.map((item) => {
        const Guests = Parse.Object.extend("Guests");
        const query = new Parse.Query(Guests);

        query.equalTo("guest", item);
        query.includeAll();
        const events = query.find();

        promisses.push(events);
      });

      const guests_values = await Promise.all(promisses).then((values) => {
        return values;
      });

      // List of friends available

      const available = [];

      // Iterates each array of relations from Guests table [ [{guest, event}, {...}, ...] , [...] ]

      guests_values.map((relation) => {
        // Array of events in that date for the friend
        const events_on_date = [];
        // Iterates each relation [ {guest, event} , {...} , ...] in array of relations from Guests table
        if (relation != []) {
          relation.map((item) => {
            if (item.get("event")) {
              // Check if the date of the event equals the date given
              const event = item.get("event");
              if (event.get("date").toISOString().split("T")[0] === date) {
                // Push event in the array of events of the given date
                events_on_date.push(item.get("event"));
              }
            }
          });
        }

        // If the array of events is empty, the user is available
        if (events_on_date.length === 0 && relation[0]) {
          available.push(relation[0].get("guest"));
        }
      });

      return available;
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }
}

module.exports = GuestClass;
