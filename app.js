var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var getEvents = require("./routes/get-events");
var auth = require("./routes/auth");
var token = require("./routes/token");
var icalEvent = require("./routes/create-event-ical");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/ical-event", icalEvent)
app.use("/auth", auth);
app.use("/get-events", getEvents);
app.use("/token", token);
app.use("/", indexRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
