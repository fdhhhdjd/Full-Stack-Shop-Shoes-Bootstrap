const router = require("express").Router();
const VerifyRefreshToken = require("../../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
const categoriesCtrl = require("../controllers/categories.controllers");

//* Get All Category
router.get("/user/category", VerifyAcceptToken, categoriesCtrl.getCategory);
module.exports = router;
