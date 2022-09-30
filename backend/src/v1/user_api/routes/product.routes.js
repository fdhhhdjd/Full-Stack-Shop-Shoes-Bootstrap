const router = require("express").Router();
const VerifyRefreshToken = require("../../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const productCtrl = require("../controllers/product.controllers");

//* Get All Product
router.get("/product", productCtrl.getProducts);

router.get("/product/detail/:id", productCtrl.getProductDetail);

module.exports = router;
