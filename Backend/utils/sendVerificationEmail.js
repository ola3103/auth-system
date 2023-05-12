const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  email,
  name,
  origin,
  verificationToken,
}) => {
  const verifyEmailLink = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

  return sendEmail({
    to: email,
    subject: "Confirm Email",
    html: `<h4>Hello ${name}</h4>
    <p>Kindly click on the following link to confirm your email <a href="${verifyEmailLink}">click here</p>`,
  });
};

module.exports = sendVerificationEmail;
