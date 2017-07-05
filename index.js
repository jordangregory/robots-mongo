const express = require("express");
const mustacheExpress = require("mustache-express");
const dbUrl = "mongodb://localhost:27017/robots";
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const port = 4000;

var app = express();

let DB;
let ROBOTDATA;

app.use(express.static(__dirname + "/public"));
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

mongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.warn("Error connecting to database", err);
  }

  DB = db;
  ROBOTDATA = db.collection("robotData");
});

app.get("/robotUsers", (req, res) => {
  ROBOTDATA.find({}).toArray(function(err, foundRobots) {
    console.log(foundRobots);
    if (err) {
      res.status(500).send(err);
    }

    res.render("todo", { robotUsers: foundRobots });
  });
});
app.get("/employed", (req, res) => {
  ROBOTDATA.find({ job: { $ne: null } }).toArray(function(err, foundRobots) {
    console.log(foundRobots);
    if (err) {
      res.status(500).send(err);
    }

    res.render("todo", { robotUsers: foundRobots });
  });
});
app.get("/unemployed", (req, res) => {
  ROBOTDATA.find({ job: null }).toArray(function(err, foundRobots) {
    console.log(foundRobots);
    if (err) {
      res.status(500).send(err);
    }

    res.render("todo", { robotUsers: foundRobots });
  });
});

app.get("/", function(req, res) {
  res.render("todo");
});

app.listen(port, function() {
  console.log("Starting app on PORT: " + port + "...");
});
