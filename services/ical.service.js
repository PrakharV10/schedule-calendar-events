const iCal = require('ical-generator');
const fs = require('fs');

function generateAndStoreICSFile(attendees) {
	const cal = iCal({
		name: 'Calendar',
		timezone: 'UTC',
		method: 'REQUEST',
	});

	cal.createEvent({
		start: new Date(),
		end: new Date(new Date().getTime() + 3600000),
		summary: 'Sample Event',
		description: 'This is a sample event',
		location: 'https://google.com',
		organizer: { email: process.env.ORGANIZER_EMAIL, name: 'PV' },
		attendees: generateAttendees(attendees),
		transparency: 'OPAQUE',
		status: 'CONFIRMED',
		method: 'REQUEST',
	});

	const filePath = `/project/sandbox/invite.ics`;
	fs.writeFileSync(filePath, cal.toString(), 'utf8');
	return cal.toString();
}

function generateAttendees(attendees) {
	return attendees.map((one) => ({
		email: one,
		role: 'REQ-PARTICIPANT',
		rsvp: true,
		status: 'NEEDS-ACTION',
		mailto: one,
		name: one,
	}));
}

module.exports = generateAndStoreICSFile;
