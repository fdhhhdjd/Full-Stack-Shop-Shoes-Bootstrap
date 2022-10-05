const router = require("express").Router();
const voucherCtrl = require("../controllers/voucher.controllers");
const VerifyAcceptTokenAdmin = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
//! get all voucher
router.get(
  "/admin/voucher",
  VerifyAcceptTokenAdmin,
  authAdmin,
  voucherCtrl.getVoucher
);
//! create voucher
router.post(
  "/admin/voucher/create",
  VerifyAcceptTokenAdmin,
  authAdmin,
  voucherCtrl.createVoucher
);
//! edit voucher
router.post(
  "/admin/voucher/update/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  voucherCtrl.editVoucher
);
//! delete voucher
router.delete(
  "/admin/voucher/delete/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  voucherCtrl.deleteVoucher
);

module.exports = router;
