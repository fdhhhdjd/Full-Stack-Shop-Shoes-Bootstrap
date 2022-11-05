const router = require("express").Router();
const paymentCtrl = require("../controllers/payment.controllers");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");

//* payment total
router.get("/payment/total", VerifyAcceptToken, paymentCtrl.totalPayment);
//* payment check inStock
router.get("/payment/check/stock", VerifyAcceptToken, paymentCtrl.countInStock);

//* payment paypal
router.post("/payment/paypal", VerifyAcceptToken, paymentCtrl.paymentPaypal);

//* payment stripe
router.post("/payment/stripe", VerifyAcceptToken, paymentCtrl.paymentStripe);

//* Payment Success
router.get("/payment/stripe/success/:id", VerifyAcceptToken, paymentCtrl.paymentStripeSuccess);

//* Payment Cancel
router.get("/payment/cancel", VerifyAcceptToken, paymentCtrl.paymentStripeCancel);



module.exports = router;
