const router = require("express").Router();
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const reviewCtrl = require("../controllers/review.controllers");

//* comment Product
router.post(
  "/review/create/:id",
  VerifyAcceptToken,
  reviewCtrl.createReviewProduct
);

//* edit comment
router.post(
  "/review/:productId/update/:commentId",
  VerifyAcceptToken,
  reviewCtrl.editReviewProduct
);
//* delete comment
router.delete(
  "/review/:productId/delete/:commentId",
  VerifyAcceptToken,
  reviewCtrl.deleteReviewProduct
);
module.exports = router;
