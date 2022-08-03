require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { format, addMonths, startOfDay } = require("date-fns");

app.use(express.json());
app.use(cors());

// Routes

app.use("/user", require("./routes/user.routes"));
app.use("/events", require("./routes/event.routes"));
app.use("/friends", require("./routes/friend.routes"));
app.use("/guests", require("./routes/guest.routes"));

// // Request the Log in passing the email and password
// app.post("/users/login", async (req, res) => {
//   const body = req.body;

//   try {
//     const user = await Parse.User.logIn(body.username, body.password);

//     res.send({ message: "User logged!", status: "success", payload: user });
//   } catch (error) {
//     res
//       .status(400)
//       .send({ message: error.message, status: "danger", payload: body });
//   }
// });

// // Register the user passing the username, password and email
// app.post("/users/register", async (req, res) => {
//   const body = req.body;
//   const user = new Parse.User();

//   user.set("username", body.username);
//   user.set("password", body.password);
//   if (body.email == null) {
//     res.status(400).send({
//       message: "Cannot register with empty email",
//       status: "danger",
//       payload: body,
//     });
//     return;
//   }
//   user.set("email", body.email);
//   user.set("publicEmail", body.email);
//   user.set("fullName", body.fullName);

//   try {
//     await user.signUp();
//     res
//       .status(200)
//       .send({ message: "User created!", status: "success", payload: body });
//   } catch (error) {
//     res
//       .status(400)
//       .send({ message: error.message, status: "danger", payload: body });
//   }
// });

// app.use("*", async (req, res, next) => {
//   const myToken = req.headers.authorization;
//   if (!myToken) {
//     req.userID = null;
//     next();
//   } else {
//     const query = new Parse.Query(Parse.Session);
//     query.include(["user"]);
//     const results = await query.first({ sessionToken: myToken });
//     req.user = results.get("user");
//     next();
//   }
// });

// app.use("/friends", async (req, res, next) => {
//   const friendList = [];

//   const Friends = Parse.Object.extend("Friends");
//   const query1 = new Parse.Query(Friends);
//   const query2 = new Parse.Query(Friends);

//   if (!req.user) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }
//   try {
//     const user = req.user;
//     query1.equalTo("user1Id", user);
//     query2.equalTo("user2Id", user);

//     const compoundQuery = Parse.Query.or(query1, query2);

//     compoundQuery.include("*");

//     const friends = await compoundQuery.find();

//     friends.map((item) => {
//       if (item.get("user1Id").id == user.id) {
//         friendList.push(item.get("user2Id"));
//       } else {
//         friendList.push(item.get("user1Id"));
//       }
//     });

//     req.friends = friendList;
//     next();
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/user/:username", async (req, res) => {
//   const User = new Parse.User();
//   const query1 = new Parse.Query(User);

//   try {
//     query1.equalTo("username", req.params.username);

//     const user = await query1.first();

//     res.send(user);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/owner/:userId", async (req, res) => {
//   const query1 = new Parse.Query(Parse.User);

//   try {
//     query1.equalTo("objectId", req.params.userId);

//     const user = await query1.first();

//     res.send(user);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/friends/notFriends", async (req, res) => {
//   const user = req.user;
//   const friends = req.friends;
//   const friendIds = [];

//   friends.map((friend) => {
//     if (friend) {
//       friendIds.push(friend.id);
//     }
//   });

//   const query = new Parse.Query(Parse.User);
//   query.notEqualTo("objectId", user.id);
//   const users = await query.find();

//   const usersNotFriends = [];

//   users.map((item, index) => {
//     if (!friendIds.includes(item.id)) {
//       usersNotFriends.push(item);
//     }
//   });

//   res.send(usersNotFriends);
// });

// app.get("/viewer", async (req, res) => {
//   const userID = req.user.id;
//   if (!userID) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }
//   try {
//     const query = new Parse.Query(Parse.User);
//     query.equalTo("objectId", userID);
//     const userObject = await query.first();
//     res.send(userObject);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/events", async (req, res) => {
//   const event_list = [];

//   const Guests = Parse.Object.extend("Guests");
//   const query = new Parse.Query(Guests);

//   if (!req.user) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }
//   try {
//     const user = req.user;
//     query.equalTo("guest", user);
//     query.include(["event"]);
//     const events = await query.find();

//     events.map((item) => {
//       if (item.get("event")) {
//         event_list.push(item.get("event"));
//       }
//     });

//     res.send(event_list);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/users/invited/:eventId", async (req, res) => {
//   const guestsList = [];

//   const eventPointer = {
//     __type: "Pointer",
//     className: "Event",
//     objectId: req.params.eventId,
//   };

//   const Guests = Parse.Object.extend("Guests");
//   const query = new Parse.Query(Guests);

//   if (!req.user) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }
//   try {
//     const user = req.user;
//     query.equalTo("event", eventPointer);
//     query.include(["guest"]);
//     const guests = await query.find();

//     guests.map((item) => {
//       if (item.get("guest")) {
//         guestsList.push(item.get("guest"));
//       }
//     });

//     res.send(guestsList);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/friends", async (req, res) => {
//   res.send(req.friends);
// });

// app.post("/addFriend", async (req, res) => {
//   const Friends = Parse.Object.extend("Friends");

//   const friend = new Friends();

//   try {
//     const userPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: req.user.id,
//     };

//     const friendPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: req.body.userCard.objectId,
//     };

//     // Check if already friends

//     const query1 = new Parse.Query(Friends);
//     const query2 = new Parse.Query(Friends);

//     query1.equalTo("user1Id", userPointer);
//     query1.equalTo("user2Id", friendPointer);

//     query2.equalTo("user1Id", friendPointer);
//     query2.equalTo("user2Id", userPointer);

//     const compoundQuery = Parse.Query.or(query1, query2);

//     const isFriend = await compoundQuery.find();

//     if (isFriend.length > 0) {
//       res.send(`Already Friends`);
//       return;
//     } else {
//       friend.set("user1Id", userPointer);
//       friend.set("user2Id", friendPointer);

//       friend.save();

//       res.send(`${req.user.username} added ${req.body.username}`);
//       return;
//     }
//   } catch (error) {
//     res.status(409).set({ message: error.message });
//     return;
//   }
// });

// app.post("/deleteFriend", async (req, res) => {
//   const user = req.user;

//   try {
//     const userPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: req.user.id,
//     };

//     const friendPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: req.body.userCard.objectId,
//     };

//     const Friends = Parse.Object.extend("Friends");

//     // Check if already friends

//     const query1 = new Parse.Query(Friends);
//     const query2 = new Parse.Query(Friends);

//     query1.equalTo("user1Id", userPointer);
//     query1.equalTo("user2Id", friendPointer);

//     query2.equalTo("user1Id", friendPointer);
//     query2.equalTo("user2Id", userPointer);

//     const compoundQuery = Parse.Query.or(query1, query2);

//     const friendRelation = await compoundQuery.first();

//     Parse.Object.destroyAll(friendRelation);

//     res.send(friendRelation);
//     return;
//   } catch (error) {
//     res.status(409).set({ message: error.message });
//     return;
//   }
// });

// app.post("/event/add", async (req, res) => {
//   const Event = Parse.Object.extend("Event");
//   const event = new Event();

//   const event_info = req.body.event;

//   try {
//     // Format everything

//     if (event_info.time === "") {
//       event_info.time = "00:00";
//     }

//     const event_format = {
//       title: event_info.title,
//       date: {
//         __type: "Date",
//         iso: event_info.date + "T" + event_info.time + ":00.000Z",
//       },
//       description: event_info.description,
//       location: event_info.location,
//       owner: req.user,
//       privacy: event_info.privacy,
//     };

//     const eventPointer = await event.save(event_format, {
//       success: (obj) => {
//         return obj;
//       },
//       error: (err) => {
//         res.status(409).set({ message: err.message });
//         return;
//       },
//     });

//     const Guests = Parse.Object.extend("Guests");

//     const Friends = Parse.Object.extend("Friends");

//     const userPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: req.user.id,
//     };

//     const guests = [userPointer, ...req.body.event.guests];

//     const promisses = [];

//     if (guests) {
//       guests.map((item) => {
//         const guest = new Guests();

//         const guestPointer = {
//           __type: "Pointer",
//           className: "_User",
//           objectId: item.objectId,
//         };

//         guest.set("event", eventPointer);
//         guest.set("guest", guestPointer);

//         guest.save();

//         const query1 = new Parse.Query(Friends);
//         const query2 = new Parse.Query(Friends);

//         query1.equalTo("user1Id", userPointer);
//         query1.equalTo("user2Id", guestPointer);

//         query2.equalTo("user1Id", guestPointer);
//         query2.equalTo("user2Id", userPointer);

//         const compoundQuery = Parse.Query.or(query1, query2);

//         const friendRelation = compoundQuery.first();

//         promisses.push(friendRelation);
//       });
//     }

//     const relations = await Promise.all(promisses);

//     relations.map((item) => {
//       if (item) {
//         const closeness = item.get("closeness") + 1;

//         item.set("closeness", closeness);

//         item.save();
//       }
//     });

//     res.send(relations);
//     return;
//   } catch (error) {
//     res.status(409).set({ message: error.message });
//     return;
//   }
// });

// app.post("/event/delete", async (req, res) => {
//   try {
//     // Delete event

//     const Event = Parse.Object.extend("Event");
//     const query = new Parse.Query(Event);

//     query.equalTo("objectId", req.body.event.objectId);

//     const event = await query.first();

//     if (event.get("owner").id === req.user.id) {
//       Parse.Object.destroyAll(event);

//       // Delete guests

//       const Guests = Parse.Object.extend("Guests");
//       const query2 = new Parse.Query(Guests);

//       const eventPointer = {
//         __type: "Pointer",
//         className: "Event",
//         objectId: req.body.event.objectId,
//       };

//       query2.equalTo("event", eventPointer);
//       const guests = await query2.find();

//       Parse.Object.destroyAll(guests);

//       res.send(eventPointer);
//     } else {
//       res.send("Only owner can delete event");
//     }
//     return;
//   } catch (error) {
//     res.status(409).set({ message: error.message });
//     return;
//   }
// });

// app.post("/event/addGuest", async (req, res) => {
//   try {
//     const event_info = req.body.event;

//     const eventPointer = {
//       __type: "Pointer",
//       className: "Event",
//       objectId: event_info.objectId,
//     };

//     const Guests = Parse.Object.extend("Guests");

//     const guest_info = req.body.guest;
//     const guest = new Guests();

//     const guestPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: guest_info.objectId,
//     };

//     guest.set("event", eventPointer);
//     guest.set("guest", guestPointer);

//     await guest.save();
//     res.send({ guestPointer });
//     return;
//   } catch (error) {
//     res.status(409).set({ message: error.message });
//     return;
//   }
// });

// app.post("/event/deleteGuest", async (req, res) => {
//   try {
//     const event_info = req.body.event;

//     const eventPointer = {
//       __type: "Pointer",
//       className: "Event",
//       objectId: event_info.objectId,
//     };

//     const guest_info = req.body.guest;

//     const guestPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: guest_info.objectId,
//     };

//     const Guests = Parse.Object.extend("Guests");

//     const query1 = new Parse.Query(Guests);
//     const query2 = new Parse.Query(Guests);

//     query1.equalTo("event", eventPointer);
//     query1.equalTo("guest", guestPointer);

//     query2.equalTo("guest", guestPointer);
//     query2.equalTo("event", eventPointer);

//     const compoundQuery = Parse.Query.or(query1, query2);

//     const guestRelation = await compoundQuery.first();

//     Parse.Object.destroyAll(guestRelation);

//     res.send(guestRelation);
//     return;
//   } catch (error) {
//     res.status(409).set({ message: error.message });
//     return;
//   }
// });

// app.get("/event/:eventId", async (req, res) => {
//   try {
//     const Event = Parse.Object.extend("Event");
//     const query = new Parse.Query(Event);

//     query.equalTo("objectId", req.params.eventId);
//     const eventDetails = await query.first();

//     if (eventDetails.get("privacy")) {
//       const eventPointer = {
//         __type: "Pointer",
//         className: "Event",
//         objectId: req.params.eventId,
//       };

//       const guestPointer = {
//         __type: "Pointer",
//         className: "_User",
//         objectId: req.user.id,
//       };

//       const Guests = Parse.Object.extend("Guests");
//       const query2 = new Parse.Query(Guests);

//       query2.equalTo("event", eventPointer);
//       query2.equalTo("guest", guestPointer);

//       const isGuest = await query2.find();

//       if (isGuest.length < 1) {
//         res.status(404).send({ message: "Event details are not available" });
//         return;
//       }
//     }

//     res.send(eventDetails);
//   } catch (error) {
//     res.status(404).set({ message: error });
//   }
// });

// app.get("/guests/available/:date", async (req, res) => {
//   // Get user's friends
//   const friendList = [];

//   const Friends = Parse.Object.extend("Friends");
//   const query1 = new Parse.Query(Friends);
//   const query2 = new Parse.Query(Friends);

//   if (!req.user) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }
//   try {
//     const user = req.user;
//     query1.equalTo("user1Id", user);
//     query2.equalTo("user2Id", user);

//     const compoundQuery = Parse.Query.or(query1, query2);

//     compoundQuery.includeAll();

//     const friends = await compoundQuery.find();

//     friends.map((item) => {
//       if (item.get("user1Id").id == user.id) {
//         friendList.push(item.get("user2Id"));
//       } else {
//         friendList.push(item.get("user1Id"));
//       }
//     });

//     // Get relation of Event - Guest from Guests table for each friend

//     const promisses = [];

//     friendList.map((item) => {
//       const Guests = Parse.Object.extend("Guests");
//       const query = new Parse.Query(Guests);

//       query.equalTo("guest", item);
//       query.includeAll();
//       const events = query.find();

//       promisses.push(events);
//     });

//     const guests_values = await Promise.all(promisses).then((values) => {
//       return values;
//     });

//     // List of friends available

//     const available = [];

//     // Iterates each array of relations from Guests table [ [{guest, event}, {...}, ...] , [...] ]

//     guests_values.map((relation) => {
//       // Array of events in that date for the friend
//       const events_on_date = [];
//       // Iterates each relation [ {guest, event} , {...} , ...] in array of relations from Guests table
//       if (relation != []) {
//         relation.map((item) => {
//           if (item.get("event")) {
//             // Check if the date of the event equals the date given
//             const event = item.get("event");
//             if (
//               event.get("date").toISOString().split("T")[0] === req.params.date
//             ) {
//               // Push event in the array of events of the given date
//               events_on_date.push(item.get("event"));
//             }
//           }
//         });
//       }

//       // If the array of events is empty, the user is available
//       if (events_on_date.length === 0 && relation[0]) {
//         available.push(relation[0].get("guest"));
//       }
//     });

//     res.send(available);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// // Function

// const getDates = (startDate, endDate) => {
//   const dates = [];
//   let currentDate = startDate;
//   const addDays = function (days) {
//     const date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
//   };
//   while (currentDate <= endDate) {
//     dates.push(format(currentDate, "yyyy-MM-dd"));
//     currentDate = addDays.call(currentDate, 1);
//   }
//   return dates;
// };

// app.post("/guests/suggested", async (req, res) => {
//   if (!req.user) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }

//   const user = req.user;

//   const friendList = [];

//   const friendWeights = {};

//   const Friends = Parse.Object.extend("Friends");

//   try {
//     let friends = req.body.guests;
//     const friends_promisses = [];

//     if (!friends || friends.length < 1) {
//       const query1 = new Parse.Query(Friends);
//       const query2 = new Parse.Query(Friends);
//       query1.equalTo("user1Id", user);
//       query2.equalTo("user2Id", user);

//       const compoundQuery = Parse.Query.or(query1, query2);

//       compoundQuery.includeAll();

//       friends = await compoundQuery.find();

//       friends.map((item) => {
//         if (item.get("user1Id").id == user.id) {
//           const friend = item.get("user2Id");

//           friendList.push(friend);
//           friendWeights[friend.id] = item.get("closeness");
//         } else {
//           const friend = item.get("user1Id");

//           friendList.push(friend);
//           friendWeights[friend.id] = item.get("closeness");
//         }
//       });
//     } else {
//       friends.map((guest) => {
//         const userPointer = {
//           __type: "Pointer",
//           className: "_User",
//           objectId: user.id,
//         };

//         const guestPointer = {
//           __type: "Pointer",
//           className: "_User",
//           objectId: guest.objectId,
//         };

//         const query1 = new Parse.Query(Friends);
//         const query2 = new Parse.Query(Friends);
//         query1.equalTo("user1Id", guestPointer);
//         query1.equalTo("user2Id", userPointer);

//         query2.equalTo("user2Id", guestPointer);
//         query2.equalTo("user1Id", userPointer);

//         const compoundQuery = Parse.Query.or(query1, query2);

//         compoundQuery.includeAll();

//         friends = compoundQuery.find();

//         friends_promisses.push(friends);
//       });

//       friendListPromisses = await Promise.all(friends_promisses).then(
//         (values) => {
//           return values;
//         }
//       );
//       friendListPromisses = [].concat.apply([], friendListPromisses);

//       friendListPromisses.map((item) => {
//         if (item.get("user1Id").id == user.id) {
//           const friend = item.get("user2Id");

//           friendList.push(friend);
//           friendWeights[friend.id] = item.get("closeness");
//         } else {
//           const friend = item.get("user1Id");

//           friendList.push(friend);
//           friendWeights[friend.id] = item.get("closeness");
//         }
//       });
//     }

//     // Get relation of Event - Guest from Guests table for each friend

//     const promisses = [];

//     friendList.map((item) => {
//       const Guests = Parse.Object.extend("Guests");
//       const query = new Parse.Query(Guests);

//       query.equalTo("guest", item);
//       query.include(["event"]);
//       const events = query.find();

//       promisses.push(events);
//     });

//     const guests_values = await Promise.all(promisses).then((values) => {
//       return values;
//     });

//     // Add friends weight

//     const merged = [];

//     guests_values.map((relations) => {
//       relations.map((relation) => {
//         merged.push({
//           user: relation.get("guest"),
//           event: relation.get("event"),
//           closeness: friendWeights[relation.get("guest").id],
//         });
//       });
//     });

//     const events_json = {};
//     merged.map((relation) => {
//       const event = relation.event;
//       const date = event.get("date").toISOString();
//       const date_format = date.split("T")[0];

//       if (events_json[date_format]) {
//         events_json[date_format] = [
//           ...events_json[date_format],
//           { event: event, weight: relation.closeness },
//         ];
//       } else {
//         events_json[date_format] = [
//           { event: event, weight: relation.closeness },
//         ];
//       }
//     });

//     // // Get dates for today + 1 month

//     const today = new Date();

//     const dates = getDates(startOfDay(today), addMonths(startOfDay(today), 1));

//     const suggestedDates = [];
//     const number_of_events = merged.length;

//     const queryTotalCloseness = new Parse.Query(Friends);

//     const friendships = await queryTotalCloseness.find();

//     let total_closeness_points = 0;
//     friendships.map((a) => {
//       total_closeness_points += a.get("closeness");
//     });

//     dates.map((date) => {
//       if (events_json[date]) {
//         const res = [].concat(...events_json[date]).map(({ weight }) => weight);

//         const weight = res.reduce((a, b) => a + b);

//         suggestedDates.push({
//           date: date,
//           points:
//             (number_of_events - events_json[date].length) *
//             (total_closeness_points - weight),
//         });
//       } else {
//         suggestedDates.push({
//           date: date,
//           points: number_of_events * total_closeness_points,
//         });
//       }
//     });

//     suggestedDates.sort((a, b) => (a.date < b.date ? 1 : -1));
//     suggestedDates.sort((a, b) => (a.points < b.points ? 1 : -1));

//     res.send(suggestedDates);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/events/:username", async (req, res) => {
//   try {
//     const username = req.params.username;

//     const User = new Parse.User();
//     const query1 = new Parse.Query(User);

//     query1.equalTo("username", req.params.username);

//     const user = await query1.first();

//     const Guests = Parse.Object.extend("Guests");
//     const query = new Parse.Query(Guests);

//     const userPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: user.id,
//     };

//     query.equalTo("guest", userPointer);
//     query.include("event");

//     const events = await query.find();

//     const events_pages = [];

//     const chunkSize = 2;
//     for (let i = 0; i < events.length; i += chunkSize) {
//       const chunk = events.slice(i, i + chunkSize);
//       events_pages.push(chunk);
//     }

//     const pages = events_pages.length;

//     res.send({
//       pages: pages.toString(),
//       number_events: events.length.toString(),
//     });
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

// app.get("/events/:username/:page", async (req, res) => {
//   try {
//     const username = req.params.username;

//     const User = new Parse.User();
//     const query1 = new Parse.Query(User);

//     query1.equalTo("username", req.params.username);

//     const user = await query1.first();

//     const Guests = Parse.Object.extend("Guests");
//     const query = new Parse.Query(Guests);

//     const userPointer = {
//       __type: "Pointer",
//       className: "_User",
//       objectId: user.id,
//     };

//     query.equalTo("guest", userPointer);
//     query.include("event");

//     const events = await query.find();

//     events.sort((a, b) =>
//       a.get("event").get("date") < b.get("event").get("date") ? 1 : -1
//     );

//     const events_pages = [];

//     const chunkSize = 2;
//     for (let i = 0; i < events.length; i += chunkSize) {
//       const chunk = events.slice(i, i + chunkSize);
//       events_pages.push(chunk);
//     }

//     const isLastPage = req.params.page == events_pages.length;
//     const page = req.params.page;

//     res.send(events_pages[page]);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// });

module.exports = app;
