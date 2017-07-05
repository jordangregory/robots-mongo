const express = require("express");
const data = require("./data.js");
const port = 4000;
const mustacheExpress = require("mustache-express");

var app = express();

app.use(express.static(__dirname + "/public"));
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

app.get("/", function(req, res) {
  res.render("todo", data);
});

app.listen(port, function() {
  console.log("Starting app on PORT: " + port + "...");
});
