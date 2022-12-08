const { SCOPES, oauth2Client } = require("../utils/constants");

async function getAuthorizedClient() {
  // Get the user's authorization to access their calendar
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    include_granted_scopes: true,
  });

  return authorizationUrl;
}

module.exports = getAuthorizedClient;
