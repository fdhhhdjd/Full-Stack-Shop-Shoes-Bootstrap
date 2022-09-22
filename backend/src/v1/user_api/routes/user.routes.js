const router = require("express").Router();
const userCtrl = require("../controllers/user.controllers");
//! Login Email,Phone
router.post("/user/login", userCtrl.loginUser);
//! Login Google
router.post("/user/login/google", userCtrl.loginUserGoogle);

module.exports = router;
