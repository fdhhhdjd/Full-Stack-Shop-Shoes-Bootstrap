const router = require("express").Router();
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
const feedbackCtrl = require("../controllers/feedback.controllers");

//* Get All feedback
router.get(
  "/feedback",
  VerifyAcceptToken,
  authAdmin,
  feedbackCtrl.getAllFeedback
);
//* response feedback
router.post(
  "/feedback/response/:id",
  VerifyAcceptToken,
  authAdmin,
  feedbackCtrl.responseFeedbackUsers
);
//* read feedback
router.get(
  "/feedback/read/:id",
  VerifyAcceptToken,
  authAdmin,
  feedbackCtrl.readEmailFeedbackUsers
);
//* read feedback
router.get(
  "/feedback/read/:id",
  VerifyAcceptToken,
  authAdmin,
  feedbackCtrl.readEmailFeedbackUsers
);
//* Filter feedback
router.post(
  "/feedback/filter",
  VerifyAcceptToken,
  authAdmin,
  feedbackCtrl.filterFeedbackUsers
);

module.exports = router;
