const router = require("express").Router();
const VerifyRefreshToken = require("../../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const userCtrl = require("../controllers/user.controllers");
// * -------------- Register -------------
//! Register Users
router.post("/user/register", userCtrl.registerUser);

// * ------------- Login -------------
//!Login Email and Phone
router.post("/user/login", userCtrl.loginUser);
//! Login Google Socials
router.post("/user/login/google", userCtrl.loginUserGoogle);
//! Login Facebook Socials
router.post("/user/login/facebook", userCtrl.loginUserFacebook);

//*------------- Verification -------------
//! Check Verification
router.get("/user/verify/:userId/:uniqueString", userCtrl.verifyEmail);

//*------------- Create New AccessToken -------------
//! New Access Token
router.get(
  "/user/new/accessToken",
  VerifyRefreshToken,
  userCtrl.createNewAccessTokens
);
//*------------- Logout Account Users -------------
//! Logout Users
router.get("/user/logout", VerifyAcceptToken, userCtrl.LogoutUser);
//*------------- Information Users -------------
//! Profile Users
router.get("/user/profile", VerifyAcceptToken, userCtrl.ProfileUser);
//! Update Users
router.post("/user/update/profile", VerifyAcceptToken, userCtrl.ProfileUser);

//*------------- Forget,reset,change Account Users -------------
//! Forget Password Users
router.post("/user/forget", userCtrl.ForgetPassword);
//! Reset Password User
router.post("/user/password/reset/:token", userCtrl.ResetPassword);
//! Change Password User
router.post(
  "/user/change/password",
  VerifyAcceptToken,
  userCtrl.ChangePassword
);

module.exports = router;
