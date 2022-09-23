const router = require("express").Router();
const userCtrl = require("../controllers/user.controllers");
// * -------------- Register -------------
router.post("/user/register", userCtrl.registerUser);

// * ------------- Login -------------
//! Login Email,Phone
router.post("/user/login", userCtrl.loginUser);
//! Login Google
router.post("/user/login/google", userCtrl.loginUserGoogle);
//! Login Facebook
router.post("/user/login/facebook", userCtrl.loginUserFacebook);

//*------------- Verification
router.get("/user/verify/:userId/:uniqueString", userCtrl.verifyEmail);

module.exports = router;
