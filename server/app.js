require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes

app.use("/user", require("./routes/user.routes"));
app.use("/events", require("./routes/event.routes"));
app.use("/friends", require("./routes/friend.routes"));
app.use("/guests", require("./routes/guest.routes"));
app.use("/category", require("./routes/category.routes"));

module.exports = app;
