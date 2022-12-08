var { readFileSync } = require("fs");
var { google } = require("googleapis");

const jsonString = readFileSync(
  "/project/sandbox/utils/service-account.json",
  "utf8"
);
const data = JSON.parse(jsonString);

const SCOPES = "https://www.googleapis.com/auth/calendar";
const GOOGLE_PRIVATE_KEY = data.private_key;
const GOOGLE_CLIENT_EMAIL = data.client_email;
const GOOGLE_PROJECT_NUMBER = "148798035888";
const GOOGLE_CALENDAR_ID = "prakhar.10.varshney@gmail.com";
const CLIENT_ID =
  "148798035888-eoc6eg13csiu49irjhqh51atjj1t62ir.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://qg4ng2-8080.preview.csb.app/token";
const SENDGRID_API_KEY =
  "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";

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const auth = new google.auth.GoogleAuth({
  keyFile: "/project/sandbox/utils/service-account.json",
  scopes: SCOPES,
});

module.exports = {
  SCOPES,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PROJECT_NUMBER,
  GOOGLE_CALENDAR_ID,
  calendar,
  auth,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  oauth2Client,
  SENDGRID_API_KEY,
};
