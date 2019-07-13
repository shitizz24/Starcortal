var express = require("express"),
  ejs = require("ejs"),
  bodyparser = require("body-parser"),
  request = require("request"),
  app = express();
app.use(bodyparser.urlencoded({ extended: true }));

request("http://www.omdbapi.com/?apikey=775e324f&s=Harry+Potter", function(
  error,
  response,
  body
) {
  if (error) {
    console.log("error");
    console.log(error);
  }
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
    console.log(data["Search"]);
  }
});
app.get("/", function(req, res) {
  res.render("1.ejs");
});
app.get("/api", function(req, res) {
  console.log(req.query);
  var type = req.query.type;
  if (type == "movies") {
    var search = req.query.url;
    var rest = "http://www.omdbapi.com/?apikey=775e324f&s=" + search;
  }
  console.log(rest);
  request(rest, function(error, response, body) {
    if (error) {
      console.log("Error");
      console.log(error);
    }
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("2.ejs", { data: data });
    }
  });
});
app.get("/test", function(req, res) {
  res.send("Hi there!");
});
app.listen(1111, function(req, res) {
  console.log("Server Started at port 1111!");
});
