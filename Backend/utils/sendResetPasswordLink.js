const sendEmail = require("./sendEmail");

const sendResetPasswordLink = async ({ name, token, origin, email }) => {
  const resetURL = `${origin}/reset-password?&email=${email}&token=${token}`;
  const message = `<p>Please click on the following link to reset password <a href="${resetURL}">Reset Password</a></p>`;

  sendEmail({
    to: email,
    subject: `Password Reset`,
    html: `Dear ${name},
    ${message}`,
  });
};

module.exports = sendResetPasswordLink;
