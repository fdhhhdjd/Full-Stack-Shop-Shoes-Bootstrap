const { returnReasons } = require("../../middlewares/handleError");
const {
  handleCreateReview,
  handleEditReview,
  handleDeleteReview,
} = require("../services/review.service/review.service");

const reviewCtrl = {
  createReviewProduct: async (req, res) => {
    try {
      const { rating, comment } = req.body;
      let review_id = req.params.id;
      let user_id = req.user.id || req.user.user_id;

      const { status, success, element } = await handleCreateReview({
        rating,
        comment,
        review_id,
        user_id,
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
  editReviewProduct: async (req, res) => {
    try {
      const { comment } = req.body;
      const user_id = req.user.id || req.user.user_id;
      const product_id = req.params.productId;
      const review_id = req.params.commentId;
      const { status, success, element } = await handleEditReview({
        comment,
        user_id,
        product_id,
        review_id,
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
  deleteReviewProduct: async (req, res) => {
    try {
      const user_id = req.user.id || req.user.user_id;
      const product_id = req.params.productId;
      const review_id = req.params.commentId;
      const { status, success, element } = await handleDeleteReview({
        user_id,
        product_id,
        review_id,
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
module.exports = reviewCtrl;
