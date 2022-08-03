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
}

module.exports = GuestClass;
