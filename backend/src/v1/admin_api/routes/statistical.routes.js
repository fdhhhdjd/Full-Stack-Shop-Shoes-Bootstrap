const router = require("express").Router();
const statisticalCtrl = require("../controllers/statistical.controllers");
const VerifyAcceptTokenAdmin = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
//!  Statistical Sum total
router.get(
  "/admin/statistical/sum",
  VerifyAcceptTokenAdmin,
  authAdmin,
  statisticalCtrl.StatisticalSumTotal
);
//!  Statistical Sum total 3 day
router.get(
  "/admin/statistical/buy/new",
  VerifyAcceptTokenAdmin,
  authAdmin,
  statisticalCtrl.ListUserBuyNew3days
);
//!Get monthly the income customer have received (12 month)
router.get(
  "/admin/statistical/month/received",
  VerifyAcceptTokenAdmin,
  authAdmin,
  statisticalCtrl.getMonthlyIncomeCustomerReceived
);
//! Get the income customer received this month and compare to last month
router.get(
  "/admin/statistical/compare/month/received",
  VerifyAcceptTokenAdmin,
  authAdmin,
  statisticalCtrl.getIncomeCustomerReceivedThisAndLastMonth
);
//!Get the income customer not received this month and compare to last month

router.get(
  "/admin/statistical/compare/month/not/received",
  VerifyAcceptTokenAdmin,
  authAdmin,
  statisticalCtrl.getIncomeCustomerNotReceivedThisAndLastMonth
);
module.exports = router;
