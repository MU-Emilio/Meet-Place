const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");
const { format, addMonths, startOfDay } = require("date-fns");

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

  static async getGuests(eventId, user) {
    const guestsList = [];

    const eventPointer = {
      __type: "Pointer",
      className: "Event",
      objectId: eventId,
    };

    const Guests = Parse.Object.extend("Guests");
    const query = new Parse.Query(Guests);

    if (!user) {
      return new BadRequestError(error.message, 401);
    }
    try {
      query.equalTo("event", eventPointer);
      query.include(["guest"]);
      const guests = await query.find();

      guests.map((item) => {
        if (item.get("guest")) {
          guestsList.push(item.get("guest"));
        }
      });

      return guestsList;
    } catch (error) {
      return new BadRequestError(error.message, 404);
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

  static async getSuggestedDates(guests, user) {
    if (!user) {
      return new BadRequestError(error.message, 401);
    }

    try {
      const friendList = [];

      const friendWeights = {};

      const Friends = Parse.Object.extend("Friends");

      let friends = guests;
      const friends_promisses = [];

      if (!friends || friends.length < 1) {
        const query1 = new Parse.Query(Friends);
        const query2 = new Parse.Query(Friends);
        query1.equalTo("user1Id", user);
        query2.equalTo("user2Id", user);

        const compoundQuery = Parse.Query.or(query1, query2);

        compoundQuery.includeAll();

        friends = await compoundQuery.find();

        friends.map((item) => {
          if (item.get("user1Id").id == user.id) {
            const friend = item.get("user2Id");

            friendList.push(friend);
            friendWeights[friend.id] = item.get("closeness");
          } else {
            const friend = item.get("user1Id");

            friendList.push(friend);
            friendWeights[friend.id] = item.get("closeness");
          }
        });
      } else {
        friends.map((guest) => {
          const userPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: user.id,
          };

          const guestPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: guest.objectId,
          };

          const query1 = new Parse.Query(Friends);
          const query2 = new Parse.Query(Friends);
          query1.equalTo("user1Id", guestPointer);
          query1.equalTo("user2Id", userPointer);

          query2.equalTo("user2Id", guestPointer);
          query2.equalTo("user1Id", userPointer);

          const compoundQuery = Parse.Query.or(query1, query2);

          compoundQuery.includeAll();

          friends = compoundQuery.find();

          friends_promisses.push(friends);
        });

        let friendListPromisses = await Promise.all(friends_promisses).then(
          (values) => {
            return values;
          }
        );
        friendListPromisses = [].concat.apply([], friendListPromisses);

        friendListPromisses.map((item) => {
          if (item.get("user1Id").id == user.id) {
            const friend = item.get("user2Id");

            friendList.push(friend);
            friendWeights[friend.id] = item.get("closeness");
          } else {
            const friend = item.get("user1Id");

            friendList.push(friend);
            friendWeights[friend.id] = item.get("closeness");
          }
        });
      }

      // Get relation of Event - Guest from Guests table for each friend

      const promisses = [];

      friendList.map((item) => {
        const Guests = Parse.Object.extend("Guests");
        const query = new Parse.Query(Guests);

        query.equalTo("guest", item);
        query.include(["event"]);
        const events = query.find();

        promisses.push(events);
      });

      const guests_values = await Promise.all(promisses).then((values) => {
        return values;
      });

      // Add friends weight

      const merged = [];

      guests_values.map((relations) => {
        relations.map((relation) => {
          merged.push({
            user: relation.get("guest"),
            event: relation.get("event"),
            closeness: friendWeights[relation.get("guest").id],
          });
        });
      });

      const events_json = {};
      merged.map((relation) => {
        const event = relation.event;
        const date = event.get("date").toISOString();
        const date_format = date.split("T")[0];

        if (events_json[date_format]) {
          events_json[date_format] = [
            ...events_json[date_format],
            { event: event, weight: relation.closeness },
          ];
        } else {
          events_json[date_format] = [
            { event: event, weight: relation.closeness },
          ];
        }
      });

      // Get dates for today + 1 month

      const today = new Date();

      const dates = [];

      let currentDate = startOfDay(today);
      const endDate = addMonths(startOfDay(today), 1);

      const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      while (currentDate <= endDate) {
        dates.push(format(currentDate, "yyyy-MM-dd"));
        currentDate = addDays.call(currentDate, 1);
      }

      const suggestedDates = [];
      const number_of_events = merged.length;

      const queryTotalCloseness = new Parse.Query(Friends);

      const friendships = await queryTotalCloseness.find();

      let total_closeness_points = 0;
      friendships.map((a) => {
        total_closeness_points += a.get("closeness");
      });

      dates.map((date) => {
        if (events_json[date]) {
          const res = []
            .concat(...events_json[date])
            .map(({ weight }) => weight);

          const weight = res.reduce((a, b) => a + b);

          suggestedDates.push({
            date: date,
            points:
              (number_of_events - events_json[date].length) *
              (total_closeness_points - weight),
          });
        } else {
          suggestedDates.push({
            date: date,
            points: number_of_events * total_closeness_points,
          });
        }
      });

      suggestedDates.sort((a, b) => (a.date < b.date ? 1 : -1));
      suggestedDates.sort((a, b) => (a.points < b.points ? 1 : -1));

      return suggestedDates;
    } catch (error) {
      return new BadRequestError(error.message, 404);
    }
  }
}

module.exports = GuestClass;
