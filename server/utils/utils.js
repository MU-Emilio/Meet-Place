const Parse = require("parse/node");

const getFriends = async (user) => {
  const friendList = [];

  const Friends = Parse.Object.extend("Friends");
  const query1 = new Parse.Query(Friends);
  const query2 = new Parse.Query(Friends);

  if (!req.user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
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
    res.status(404).send({ message: error.message });
  }
  return;
};

// export { getFriends };
