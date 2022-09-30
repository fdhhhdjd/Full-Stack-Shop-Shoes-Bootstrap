const path = require("path");
const sendEmail = require("../utils/storage");
const CONFIGS = require("../configs/configs");
const CONSTANTS = require("../configs/constants");
const registerSendEmail = async (message) => {
  let confirmEmailUrl = message.confirmEmailUrl;
  if (confirmEmailUrl) {
    await sendEmail({
      from: CONFIGS.SMTP_MAIL,
      to: message.email,
      subject: `Verify Your Email`,
      template: "confirm-email",
      attachments: [
        {
          filename: "netflix.png",
          path: path.resolve("./src/v1/views", "images", "netflix.jpg"),
          cid: "netflix_logo",
        },
      ],
      context: {
        confirmEmailUrl,
      },
    });
  }
};
const resetPasswordSendEmail = async (message) => {
  const { resetPasswordUrl, email } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: email,
    subject: `Forgot Password`,
    template: "forgot-password",
    attachments: [
      {
        filename: "netflix.jpg",
        path: path.resolve("./src/v1/views", "images", "netflix.jpg"),
        cid: "netflix_logo",
      },
      {
        filename: "question.png",
        path: path.resolve("./src/v1/views", "images", "question.png"),
        cid: "question_img",
      },
    ],
    context: {
      resetPasswordUrl,
    },
  });
};
const registerGoogleNewPassword = async (message) => {
  const { password, name, email } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: email,
    subject: `Password For You`,
    template: "password-register",
    context: {
      password,
      name,
      email,
    },
  });
};

module.exports = {
  registerSendEmail,
  resetPasswordSendEmail,
  registerGoogleNewPassword,
};
