const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

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
}

module.exports = UserClass;
