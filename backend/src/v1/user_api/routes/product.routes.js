const router = require("express").Router();
const VerifyRefreshToken = require("../../middlewares/VerifyRefreshToken.middleware");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const productCtrl = require("../controllers/product.controllers");

//* Get All Product
router.get("/product", productCtrl.getProducts);

router.get("/product/detail/:id", productCtrl.getProductDetail);
// * add to cart
router.post(
  "/product/add/cart",
  VerifyAcceptToken,
  productCtrl.addToCartProduct
);
// * inDeCrement Cart product
router.post(
  "/product/indecrement/cart",
  VerifyAcceptToken,
  productCtrl.quantityCartProduct
);
// * del Cart Product
router.post("/product/del/cart", VerifyAcceptToken, productCtrl.delCartProduct);
// * Get Add to cart
router.get("/product/get/cart", VerifyAcceptToken, productCtrl.getAddToCart);
module.exports = router;
