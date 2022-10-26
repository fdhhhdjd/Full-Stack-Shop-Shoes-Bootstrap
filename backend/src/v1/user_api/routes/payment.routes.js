const router = require("express").Router();
const paymentCtrl = require("../controllers/payment.controllers");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");

//* payment total
router.get("/payment/total", VerifyAcceptToken, paymentCtrl.totalPayment);
//* payment check inStock
router.get("/payment/check/stock", VerifyAcceptToken, paymentCtrl.countInStock);

//* payment paypal
router.post("/payment/paypal", VerifyAcceptToken, paymentCtrl.paymentPaypal);
module.exports = router;
