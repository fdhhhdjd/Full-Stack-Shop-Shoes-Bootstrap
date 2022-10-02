const { RedisPub } = require("../../../utils/limited_redis");
const feedbacks = require("../../../models/feedBackModel");
const HELPER = require("../../../utils/helper");
module.exports = {
  handleGetAllFeedback: async () => {
    const list_feedback = await feedbacks.aggregate([
      {
        $project: {
          doc: "$$ROOT",
          latest: {
            $cond: {
              if: { $gt: ["$createdAt", "$updatedAt"] },
              then: "$createdAt",
              else: "$updatedAt",
            },
          },
        },
      },
      { $sort: { latest: -1 } },
    ]);
    return {
      status: 200,
      success: true,
      element: {
        list_feedback,
      },
    };
  },
  handleResponseFeedback: async ({ id, response_content }) => {
    const feedback = await feedbacks.findById({ _id: id });
    if (!feedback) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "This feedback does not exist",
        },
      };
    }
    await RedisPub(
      "admin_response_feedback",
      JSON.stringify({
        feedback,
        response_content,
      })
    );
    return {
      status: 200,
      success: true,
      element: {
        msg: "Sent email response feedback successfully",
      },
    };
  },
  handleReadFeedback: async ({ id }) => {
    try {
      if (!id) {
        return {
          status: 200,
          success: true,
          element: {
            msg: "Sent email response feedback successfully",
          },
        };
      }
      let time_log_gmt7_string = HELPER.getCurrentTimeJP();
      await feedbacks.findOneAndUpdate(
        { _id: id },
        { read_at: time_log_gmt7_string, checked: true }
      );
      return {
        status: 200,
        success: true,
        element: {
          msg: "Read Email Successfully!!",
        },
      };
    } catch (err) {
      return {
        status: 500,
        success: false,
        element: {
          msg: "Server busy!",
        },
      };
    }
  },
  handleSearchFeedbackDate: async ({ checked }) => {
    if (checked === "0") {
      const list_feedback = await feedbacks.aggregate([
        {
          $project: {
            doc: "$$ROOT",
            latest: {
              $cond: {
                if: { $gt: ["$createdAt", "$updatedAt"] },
                then: "$createdAt",
                else: "$updatedAt",
              },
            },
          },
        },
        { $sort: { latest: -1 } },
      ]);
      return {
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        element: {
          list_feedback,
        },
      };
    } else if (checked === "1") {
      const list_feedback = await feedbacks
        .find({ checked: true })
        .sort({ createdAt: -1 });
      return {
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        element: {
          list_feedback,
        },
      };
    } else if (checked === "2") {
      const list_feedback = await feedbacks
        .find({ checked: false })
        .sort({ createdAt: -1 });
      return {
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        element: {
          list_feedback,
        },
      };
    }
  },
};
