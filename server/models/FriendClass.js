const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

class FriendsClass {
  static async addFriend(user, friendObject) {
    const Friends = Parse.Object.extend("Friends");
    const friend = new Friends();

    try {
      const userPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: user.id,
      };

      const friendPointer = {
        __type: "Pointer",
        className: "_User",
        objectId: friendObject.objectId,
      };

      // Check if already friends

      const query1 = new Parse.Query(Friends);
      const query2 = new Parse.Query(Friends);

      query1.equalTo("user1Id", userPointer);
      query1.equalTo("user2Id", friendPointer);

      query2.equalTo("user1Id", friendPointer);
      query2.equalTo("user2Id", userPointer);

      const compoundQuery = Parse.Query.or(query1, query2);

      const isFriend = await compoundQuery.find();

      if (isFriend.length > 0) {
        return new BadRequestError("Already Friends");
      } else {
        friend.set("user1Id", userPointer);
        friend.set("user2Id", friendPointer);

        friend.save();

        return `${user.username} added ${friendObject.username}`;
      }
    } catch (error) {
      return new BadRequestError(error.message, 409);
    }
  }
}

module.exports = FriendsClass;
