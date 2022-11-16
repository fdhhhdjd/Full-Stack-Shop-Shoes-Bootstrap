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
// * InCrement Cart product
router.post(
  "/product/increment/cart",
  VerifyAcceptToken,
  productCtrl.incrementQuantityCartProduct
);
// * DeCrement Cart product
router.post(
  "/product/decrement/cart",
  VerifyAcceptToken,
  productCtrl.decrementQuantityCartProduct
);
// * del Cart Product
router.post("/product/del/cart", VerifyAcceptToken, productCtrl.delCartProduct);
// * Get Add to cart
router.get("/product/get/cart", VerifyAcceptToken, productCtrl.getAddToCart);
module.exports = router;
