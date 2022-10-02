const { set, get } = require("../../../utils/limited_redis");
const Category = require("../../../models/CategoryModel");
const feedbacks = require("../../../models/feedBackModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
module.exports = {
  sendFeedback: async (
    fullname,
    email,
    subject,
    content,
    read_at,
    time_log_gmt7_string
  ) => {
    const newFeedback = new feedbacks({
      fullname,
      email,
      subject,
      content,
      send_at: time_log_gmt7_string,
      read_at,
    });
    await newFeedback.save();
  },
};
