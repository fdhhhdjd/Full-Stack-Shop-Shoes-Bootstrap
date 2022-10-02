const {
  handleSendFeedback,
} = require("../services/feedback.service/feedback.service");
const { returnReasons } = require("../../middlewares/handleError");
const HELPER = require("../../utils/helper");
const feedbackCtrl = {
  sendFeedBackUsers: async (req, res) => {
    try {
      const { fullname, email, subject, content, read_at } = req.body;
      let time_log_gmt7_string = HELPER.getCurrentTimeJP();
      const { status, success, element } = await handleSendFeedback({
        fullname,
        email,
        subject,
        content,
        read_at,
        time_log_gmt7_string,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
};
module.exports = feedbackCtrl;
