const express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
const generateEmail = require('../services/generateEmail');
const { v4: uuidv4 } = require('uuid');
const generateAndStoreICSFile = require('../services/ical.service');

// Array of attendees emails
const attendees = process.env.ATTENDEES;

router.get('/', async (_req, res) => {
	try {
		const icsFile = generateAndStoreICSFile(attendees);
		sgMail.setApiKey(proces.env.SENDGRID_API_KEY);

		const attachment = {
			filename: 'invite.ics',
			name: 'invite.ics',
			content: Buffer.from(icsFile).toString('base64'),
			disposition: 'attachment',
			contentId: uuidv4(),
			type: 'text/calendar; method=request',
		};

		const { description } = generateEmail();

		const msg = {
			to: attendees,
			from: process.env.SENDER_EMAIL,
			subject: 'Ical Event',
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
