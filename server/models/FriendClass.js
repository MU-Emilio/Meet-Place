const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

class FriendsClass {
  static async getFriends(user) {
    const friendList = [];

    const Friends = Parse.Object.extend("Friends");
    const query1 = new Parse.Query(Friends);
    const query2 = new Parse.Query(Friends);

    if (!user) {
      return new BadRequestError("Unauthorized");
    }
    try {
      query1.equalTo("user1Id", user);
      query2.equalTo("user2Id", user);

      const compoundQuery = Parse.Query.or(query1, query2);

      compoundQuery.include("*");

      const friends = await compoundQuery.find();

      friends.map((item) => {
        if (item.get("user1Id").id == user.id) {
          friendList.push(item.get("user2Id"));
        } else {
          friendList.push(item.get("user1Id"));
        }
      });

      return friendList;
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

  static async getNotFriends(user) {
    try {
      const friends = await FriendsClass.getFriends(user);

      const friendIds = [];

      friends.map((friend) => {
        if (friend) {
          friendIds.push(friend.id);
        }
      });

      const query = new Parse.Query(Parse.User);
      query.notEqualTo("objectId", user.id);
      const users = await query.find();

      const usersNotFriends = [];

      users.map((item, index) => {
        if (!friendIds.includes(item.id)) {
          usersNotFriends.push(item);
        }
      });

      return usersNotFriends;
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

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

  static async deleteFriend(user, friendObject) {
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

      const Friends = Parse.Object.extend("Friends");

      // Check if already friends

      const query1 = new Parse.Query(Friends);
      const query2 = new Parse.Query(Friends);

      query1.equalTo("user1Id", userPointer);
      query1.equalTo("user2Id", friendPointer);

      query2.equalTo("user1Id", friendPointer);
      query2.equalTo("user2Id", userPointer);

      const compoundQuery = Parse.Query.or(query1, query2);

      const friendRelation = await compoundQuery.first();

      Parse.Object.destroyAll(friendRelation);

      return friendRelation;
    } catch (error) {
      return new BadRequestError(error.message, 409);
    }
  }
}

module.exports = FriendsClass;
