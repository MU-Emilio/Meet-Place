const Parse = require("../utils/parse_config");

class AuthClass {
  static async getInformationUser(req, res, next) {
    const myToken = req.headers.authorization;
    if (!myToken) {
      req.user = null;
      next();
    } else {
      const query = new Parse.Query(Parse.Session);
      query.include(["user"]);
      const results = await query.first({ sessionToken: myToken });
      req.user = results.get("user");
      next();
    }
  }
}

module.exports = AuthClass;
