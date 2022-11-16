const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetAllFeedback,
  handleResponseFeedback,
  handleReadFeedback,
  handleSearchFeedbackDate,
} = require("../services/feedback_admin/feedback.service");
const feedbackCtrl = {
  //* Get All Feedback
  getAllFeedback: async (req, res) => {
    try {
      const { status, success, element } = await handleGetAllFeedback();
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
  //* Response feedback user
  responseFeedbackUsers: async (req, res) => {
    try {
      const id = req.params.id;
      const { response_content } = req.body;
      const { status, success, element } = await handleResponseFeedback({
        id,
        response_content,
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
  //* Read Email
  readEmailFeedbackUsers: async (req, res) => {
    try {
      const id = req.params.id;
      const { status, success, element } = await handleReadFeedback({
        id,
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
  //* Filter email
  filterFeedbackUsers: async (req, res) => {
    try {
      let { checked } = req.body;

      const { status, success, element } = await handleSearchFeedbackDate({
        checked,
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
