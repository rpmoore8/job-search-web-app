const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const profile = require("./routes/profile");
const jobs = require("./routes/jobs");
const search = require("./routes/search");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const userDB = require("./config/keys").usersURI;

// Connect to MongoDB
mongoose
  .connect(
    userDB,
    { useNewUrlParser: true }
  )
  .then(() => console.log("userDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/users", users);
app.use("/profile", profile);
app.use("/jobs", jobs);
app.use("/search", search);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
