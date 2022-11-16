const path = require("path");
const sendEmail = require("../utils/storage");
const CONFIGS = require("../configs/configs");
const registerAdminSendOtp = async (message) => {
  const { OTP, email } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: email,
    subject: `OTP Register ${email}`,
    html: `<p>There is key private,please don't share.</p><p><b>expires in 15 minute</b>.</p><p>Key OTP: <b>${OTP}</b> Thank You.</p>`,
  });
};
const NewPasswordAdminSendOtp = async (message) => {
  const { password, email } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: email,
    subject: `Register Success ${email}`,
    html: `<p>There is key private,please don't share.</p><p></p><p>
    password your is: <b>${password}</b> Thank You.</p>`,
  });
};
const forgetAdminNewPassword = async (message) => {
  const { password, email } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: email,
    subject: `Reset Password ${email}`,
    html: `<p>There is key private,please don't share.</p><p></p><p>
    password your is: <b>${password}</b> Thank You.</p>`,
  });
};
const registerAdminGoogleNewPassword = async (message) => {
  const { password, email, name } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: email,
    subject: `Password For Admin`,
    template: "password-register",
    context: {
      password,
      name,
      email,
    },
  });
};
const responseFeedback = async (message) => {
  const { feedback, response_content } = message;
  await sendEmail({
    from: CONFIGS.SMTP_MAIL,
    to: feedback.email,
    subject: feedback.subject,
    template: "response_feedback",
    attachments: [
      {
        filename: "netflix.jpg",
        path: path.resolve("./src/v1/views", "images", "netflix.jpg"),
        cid: "netflix_logo",
      },
    ],
    context: {
      fullname: feedback.fullname,
      feedback_content: feedback.content,
      response_content,
    },
  });
};

module.exports = {
  registerAdminSendOtp,
  NewPasswordAdminSendOtp,
  registerAdminGoogleNewPassword,
  forgetAdminNewPassword,
  responseFeedback,
};
