const router = require("express").Router();
const adminCtrl = require("../controllers/admin.controllers");
const VerifyRefreshToken = require("../../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
const RateLimitMiddleware = require("../../middlewares/ratelimit.middleware")
// * ------------- Login -------------
//!Login Email and Phone
router.post("/admin/login", adminCtrl.loginAdmin);
//!Login Google
router.post("/admin/login/google", adminCtrl.loginAdminGoogle);
//! Register send otp
router.post("/admin/register", RateLimitMiddleware, adminCtrl.registerAdmin);
//! Logout admin
router.get(
  "/admin/logout",
  VerifyAcceptToken,
  authAdmin,
  adminCtrl.logoutAdmin
);

//! Check Otp
router.post("/admin/verification/otp", adminCtrl.verifyOtpAdmin);
//! new access token
router.post(
  "/admin/new/access",
  VerifyRefreshToken,
  adminCtrl.createNewAccessTokens
);
//! Forget Admin
router.post("/admin/forget", adminCtrl.forgetAdmin);
//! Profile admin
router.get(
  "/admin/profile",
  VerifyAcceptToken,
  authAdmin,
  adminCtrl.ProfileAdmin
);
//! upload profile admin
router.post(
  "/admin/update/profile",
  VerifyAcceptToken,
  authAdmin,
  adminCtrl.UpdateProfileAdmin
);
//! Change password
router.post(
  "/admin/change/password",
  VerifyAcceptToken,
  authAdmin,
  adminCtrl.ChangePasswordAdmin
);
module.exports = router;
