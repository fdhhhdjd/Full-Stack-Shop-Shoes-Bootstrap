const router = require("express").Router();
const VerifyRefreshToken = require("../../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
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

//*------------- Verification -------------
router.get("/user/verify/:userId/:uniqueString", userCtrl.verifyEmail);

//*------------- Create New AccessToken -------------
router.get(
  "/user/new/accessToken",
  VerifyRefreshToken,
  userCtrl.createNewAccessTokens
);
//*------------- Logout Account Users -------------
router.get("/user/logout", VerifyAcceptToken, userCtrl.LogoutUser);
//*------------- Informatio Users -------------
router.get("/user/profile", VerifyAcceptToken, userCtrl.ProfileUser);

module.exports = router;
