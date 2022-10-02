const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const {
  registerSendEmail,
  resetPasswordSendEmail,
  registerGoogleNewPassword,
  feedbackUsers,
} = require("./src/v1/user_api/auth_user");
const REDIS = require("./src/v1/db/Redis");
const {
  registerAdminSendOtp,
  NewPasswordAdminSendOtp,
  registerAdminGoogleNewPassword,
  forgetAdminNewPassword,
  responseFeedback,
} = require("./src/v1/admin_api/auth_admin");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/api", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Server Send Email ",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});
//! Users
REDIS.psubscribe("u*");
REDIS.on("pmessage", (pattern, channel, message) => {
  console.log("Pattern Send Email", pattern);
  console.log("Channel Send Email", channel);
  switch (channel) {
    case "user_register":
      registerSendEmail(JSON.parse(message));
      break;
    case "user_forget_password":
      resetPasswordSendEmail(JSON.parse(message));
      break;
    case "user_register_password_google_facebook":
      registerGoogleNewPassword(JSON.parse(message));
      break;
    case "user_feedback":
      feedbackUsers(JSON.parse(message));
      break;
  }
});
//!Admin
REDIS.psubscribe("a*");
REDIS.on("pmessage", (pattern, channel, message) => {
  console.log("Pattern Send Email", pattern);
  console.log("Channel Send Email", channel);
  switch (channel) {
    case "admin_register_send_otp":
      registerAdminSendOtp(JSON.parse(message));
      break;
    case "admin_register_otp_new_password":
      NewPasswordAdminSendOtp(JSON.parse(message));
      break;
    case "admin_register_password_google_facebook":
      registerAdminGoogleNewPassword(JSON.parse(message));
      break;
    case "admin_forget_password":
      forgetAdminNewPassword(JSON.parse(message));
      break;
    case "admin_response_feedback":
      responseFeedback(JSON.parse(message));
      break;
  }
});

//!Auth Users

const PORT = process.env.PORT || 5002;
app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
