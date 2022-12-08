var express = require("express");
var router = express.Router();
var getAuthorizedClient = require("../services/authorize.service");

router.get("/", async (_req, res) => {
  const authorizationUrl = await getAuthorizedClient();
  res.status(301).json({ location: authorizationUrl });
});

module.exports = router;
