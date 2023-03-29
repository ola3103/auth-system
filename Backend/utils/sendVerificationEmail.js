const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  email,
  name,
  origin,
  verificationToken,
}) => {
  const verifyEmailLink = `${origin}/user/verify-email/?token=${verificationToken}&token=${verificationToken}`;

  return sendEmail({
    to: email,
    subject: "Confirm Email",
    html: `<h4>Hello ${name}</h4>
    <a href='${origin}/verify-email?email=${email}&token=${verificationToken}'>${origin}/verify-email?email=${email}&token=${verificationToken}</a>`,
  });
};

module.exports = sendVerificationEmail;
