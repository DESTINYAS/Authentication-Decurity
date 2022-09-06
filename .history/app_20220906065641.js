//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/register", function (req, res) {
  res.render("register");
});
app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function (req, res) {
  User.findOne(
    { email: req.body.username, password: req.body.password },
    function (err, foundUser) {
      if (err) {
        res.send(err);
      } else {
        res.render("secrets");
      }
    }
  );
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
