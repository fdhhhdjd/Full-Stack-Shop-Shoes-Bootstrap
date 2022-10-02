const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
const { RedisPub } = require("../../../utils/limited_redis");
const { sendFeedback } = require("./crud_feedbacl.service");
module.exports = {
  handleSendFeedback: async ({
    fullname,
    email,
    subject,
    content,
    read_at,
    time_log_gmt7_string,
  }) => {
    if (!fullname || !email || !subject || !content) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Please fill in full infomation",
        },
      };
    }
    const checkEmail = HELPER.validateEmail(email);
    if (!checkEmail) {
      return {
        status: 307,
        success: false,
        element: {
          msg: "Invalid Email",
        },
      };
    }
    await sendFeedback(
      fullname,
      email,
      subject,
      content,
      read_at,
      time_log_gmt7_string
    );

    await RedisPub(
      "user_feedback",
      JSON.stringify({
        email,
        fullname,
        content,
        subject,
      })
    );
    return {
      status: 200,
      success: true,
      element: {
        msg: "Send Feedback Successfully !!",
      },
    };
  },
};
