const express = require("express");
var router = express.Router();
const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("../utils/constants");
const generateEmail = require("../services/generateEmail");
const { v4: uuidv4 } = require("uuid");
const generateAndStoreICSFile = require("../services/ical.service");

const attendees = ["prakhar@invact.com"];

router.get("/", async (_req, res) => {
  try {
    const icsFile = generateAndStoreICSFile(attendees);
    sgMail.setApiKey(SENDGRID_API_KEY);

    const attachment = {
      filename: "invite.ics",
      name: "invite.ics",
      content: Buffer.from(icsFile).toString("base64"),
      disposition: "attachment",
      contentId: uuidv4(),
      type: "text/calendar; method=request",
    };

    const { description } = generateEmail();

    const msg = {
      to: attendees,
      from: "support@invact.com",
      subject: "Ical Event",
      attachments: [attachment],
      html: `${description}`,
    };

    const response = await sgMail.sendMultiple(msg);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

// export const generateAndStoreICSFile = (
//   attendees: string[],
//   eventData: CreateEventData,
// ) => {
//   const cal = iCal({
//     name: "Calendar",
//     timezone: "IST",
//     method: ICalCalendarMethod.REQUEST,
//   });

//   cal.createEvent({
//     start: eventData.start_at,
//     end: eventData.end_at,
//     summary: eventData.title,
//     description: eventData.description,
//     location: eventData.cta_link,
//     organizer: { email: process.env.NOREPLY_SENDER_EMAIL, name: "Invact Team" },
//     attendees: generateFormattedAttendeesList(attendees),
//     transparency: ICalEventTransparency.OPAQUE,
//     status: ICalEventStatus.CONFIRMED,
//   });
// };

// const generateFormattedAttendeesList = (attendees: string[]) => {
//   const attendeesList = attendees.map((attendee) => {
//     return {
//       name: attendee,
//       email: attendee,
//       mailto: attendee,
//       status: ICalAttendeeStatus.NEEDSACTION,
//       rsvp: true,
//       role: ICalAttendeeRole.REQ,
//     };
//   });

//   return attendeesList;
// };
