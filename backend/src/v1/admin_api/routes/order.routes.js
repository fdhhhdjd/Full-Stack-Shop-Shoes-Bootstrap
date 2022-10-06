const router = require("express").Router();
const orderCtrl = require("../controllers/order.controller");
const VerifyAcceptTokenAdmin = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
//! Update Order Delete
router.get(
  "/admin/order/update/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  orderCtrl.updateOrderDeleteUser
);

//! Get all Orders
router.get(
  "/admin/order",
  VerifyAcceptTokenAdmin,
  authAdmin,
  orderCtrl.GetAllOrderUsers
);
//! Get all Orders
router.get(
  "/admin/order/delete",
  VerifyAcceptTokenAdmin,
  authAdmin,
  orderCtrl.GetAllOrderUsersDelete
);

//! upload status
router.post(
  "/admin/order/upload/status/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  orderCtrl.updateStatusOrders
);
//! detail orders
router.get(
  "/admin/order/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  orderCtrl.detailOrder
);

module.exports = router;
