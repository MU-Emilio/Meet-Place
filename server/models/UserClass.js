const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");
const { User, Query } = require("parse/node");

class UserClass {
  static async loginUser(body) {
    try {
      const user = await Parse.User.logIn(body.username, body.password);

      return { message: "User logged!", status: "success", payload: user };
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

  static async registerUser(body) {
    const user = new Parse.User();

    user.set("username", body.username);
    user.set("password", body.password);
    if (body.email == null) {
      return {
        message: "Cannot register with empty email",
        status: "danger",
        payload: body,
      };
    }
    user.set("email", body.email);
    user.set("publicEmail", body.email);
    user.set("fullName", body.fullName);

    try {
      await user.signUp();

      return { message: "User created!", status: "success", payload: body };
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

  static async getInformationUser(myToken) {
    if (!myToken) {
      return null;
    } else {
      const query = new Parse.Query(Parse.Session);
      query.include(["user"]);
      const results = await query.first({ sessionToken: myToken });
      return results.get("user");
    }
  }

  static async getInformationViewer(user) {
    const userID = user.id;
    if (!userID) {
      return new BadRequestError("Unauthorized");
    }
    try {
      const query = new Parse.Query(Parse.User);
      query.equalTo("objectId", userID);
      const userObject = await query.first();
      return userObject;
    } catch (error) {
      throw new BadRequestError(error.message, 404);
    }
  }

  static async getUserDetails(username) {
    const User = new Parse.User();
    const query1 = new Parse.Query(User);

    try {
      query1.equalTo("username", username);

      const user = await query1.first();

      return user;
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

  static async getOwnerDetails(userId) {
    const query1 = new Parse.Query(Parse.User);

    try {
      query1.equalTo("objectId", userId);

      const user = await query1.first();

      return user;
    } catch (error) {
      return new BadRequestError(error.message);
    }
  }

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
      const friends = await UserClass.getFriends(user);

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
}

module.exports = UserClass;
