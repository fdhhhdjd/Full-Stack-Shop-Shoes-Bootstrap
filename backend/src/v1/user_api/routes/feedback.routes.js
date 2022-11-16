const router = require("express").Router();
const feedbackCtrl = require("../controllers/feedbacks.controllers");

//* Get All Category
router.post("/feedback/send", feedbackCtrl.sendFeedBackUsers);
module.exports = router;
