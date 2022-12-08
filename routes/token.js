var express = require("express");
var router = express.Router();
var { google } = require("googleapis");
var { oauth2Client } = require("../utils/constants");
var event = require("../utils/events");

router.use("/", async (req, res) => {
  if (req.query.code) {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const response = calendar.events.insert(
      {
        auth: oauth2Client,
        calendarId: "primary",
        resource: event,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log("Event created: %s", event);
      }
    );

    console.log(response);
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: "Code Not Found" });
  }
});

module.exports = router;
