const router = require("express").Router();
const manager_userCtrl = require("../controllers/manager_users_controllers");
const VerifyAcceptTokenAdmin = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
//! get all Users
router.get(
  "/admin/getall/users",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.getAllUsers
);
//! get all Admin
router.get(
  "/admin/getall/admin",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.getAllAdmin
);
//! Upload Account Users and Admin
router.post(
  "/admin/upload/account/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.uploadAccountUserAndAdmin
);
//! Delete Account Users and Admin
router.delete(
  "/admin/delete/account/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.deleteAccountUserAndAdmin
);

//! List account register new 3 days.
router.get(
  "/admin/getall/user/new",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.ListAccountUserNew
);
//! List account user delete order
router.get(
  "/admin/getall/user/delete/order",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.ListAccountUserDeleteOrder
);
//! List Monthly Registered Customer
router.get(
  "/admin/getall/user/register/month",
  VerifyAcceptTokenAdmin,
  authAdmin,
  manager_userCtrl.ListMonthlyRegisteredCustomers
);

module.exports = router;
