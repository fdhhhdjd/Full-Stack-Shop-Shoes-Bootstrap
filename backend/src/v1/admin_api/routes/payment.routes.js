const router = require("express").Router();
const paymentCtrl = require("../controllers/payment.controller");
const VerifyAcceptTokenAdmin = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
//! get all Users
router.get(
  "/admin/payment/update/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  paymentCtrl.updateOrderDeleteUser
);
module.exports = router;
