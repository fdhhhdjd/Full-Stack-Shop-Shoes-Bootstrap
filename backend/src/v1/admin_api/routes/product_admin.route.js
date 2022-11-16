const router = require("express").Router();
const productCtrl = require("../controllers/productadmin.controllers");
const VerifyAcceptTokenAdmin = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
//! get all product sort,limit,filter
router.get(
  "/admin/product",
  VerifyAcceptTokenAdmin,
  authAdmin,
  productCtrl.getallProduct
);
//! get Product Id
router.get(
  "/admin/product/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  productCtrl.getProductId
);
//! Create Product
router.post(
  "/admin/product/create",
  VerifyAcceptTokenAdmin,
  authAdmin,
  productCtrl.createProduct
);
//! Edit Product
router.post(
  "/admin/product/edit/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  productCtrl.editProduct
);
//! Delete Product
router.delete(
  "/admin/product/delete/:id",
  VerifyAcceptTokenAdmin,
  authAdmin,
  productCtrl.deleteProduct
);

module.exports = router;
