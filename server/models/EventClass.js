const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

class EventClass {
  static async getEvents(user) {
    try {
      const event_list = [];

      const Guests = Parse.Object.extend("Guests");
      const query = new Parse.Query(Guests);

      if (!user) {
        return new BadRequestError("Unauthorized", 401);
      }

      query.equalTo("guest", user);
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

  static getGuests() {}

  static addUser() {}

  static deleteUser() {}
}

module.exports = EventClass;
