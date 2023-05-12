const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = { from: process.env.EMAIL_USER, to, subject, html };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = sendEmail;
