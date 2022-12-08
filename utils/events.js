var event = {
  summary: "My first event!",
  location: "Bangalore, India",
  description: "First event with nodeJS!",
  start: {
    dateTime: "2023-01-31T10:39:00.058Z",
    timeZone: "Asia/Kolkata",
  },
  end: {
    dateTime: "2023-01-31T11:39:00.058Z",
    timeZone: "Asia/Kolkata",
  },
  attendees: [],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};

module.exports = event;
