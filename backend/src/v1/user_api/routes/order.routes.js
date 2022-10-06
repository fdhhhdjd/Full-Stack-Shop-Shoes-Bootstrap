const router = require("express").Router();
const orderCtrl = require("../controllers/order.controllers");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");

//* Get history orders
router.get("/order/history", VerifyAcceptToken, orderCtrl.historyOrders);

//* Delete flag orders
router.get("/order/delete/:id", VerifyAcceptToken, orderCtrl.deleteFlagOrders);

//* Get Detail orders
router.get("/order/:id", VerifyAcceptToken, orderCtrl.getDetailOrders);

module.exports = router;
