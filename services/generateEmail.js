function generateEmail() {
  const subject = `Course and Advertisment Analytics Data`;
  const description = `
<!DOCTYPE html>
<html>
<head>
<style>
body {
	font-family: Arial, Helvetica, sans-serif;
}
.container{
	margin-left:120px;
  }
.sub-heading{
	font-size:1.4rem;
    color:gray;
    opacity:0.6;
}
.heading{
    font-size:1.5rem;
    font-weight:600;
}
.date-text{
	color:#F4410B;
  margin-bottom:40px;
}
</style>
</head>
<body>
<div class='container'>
  <div class='sub-heading'>You are invited to</div>
  <div class='heading'>Metaversity Community Event</div>
  <div class='date-text'>On Wednesday, February 1 at 2:00 PM IST</div>
  <p>See you at the event!</p>
</div>
</body>
</html>
  `;

  return { subject, description };
}

module.exports = generateEmail;
