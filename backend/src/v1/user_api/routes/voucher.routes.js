const router = require("express").Router();
const voucherCtrl = require("../controllers/voucher.controllers");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");

//* payment paypal
router.post("/user/voucher", VerifyAcceptToken, voucherCtrl.addVoucher);

//* Del voucher
router.get("/user/voucher/del", VerifyAcceptToken, voucherCtrl.delVoucher);
module.exports = router;
