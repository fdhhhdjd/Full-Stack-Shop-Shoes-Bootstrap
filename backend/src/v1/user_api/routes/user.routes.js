const router = require("express").Router();
const userCtrl = require("../../user_api/controllers/user.controllers");
//! Login Email,Phone
router.post("/user/login", userCtrl.loginUser);
//! Login Google
// router.post("/user/login/google", userCtrl.loginUserGoogle);

module.exports = router;
