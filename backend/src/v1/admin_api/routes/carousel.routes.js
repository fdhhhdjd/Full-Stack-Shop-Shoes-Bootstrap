const router = require("express").Router();
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
const carouselCtrl = require("../controllers/courousel.controllers");

//* Get All carousel
router.get(
  "/admin/carousel",
  VerifyAcceptToken,
  authAdmin,
  carouselCtrl.getallCarousel
  //* Create carousel
);
router.post(
  "/admin/carousel/create",
  VerifyAcceptToken,
  authAdmin,
  carouselCtrl.createCarousel
);
router.post(
  "/admin/carousel/edit/:id",
  VerifyAcceptToken,
  authAdmin,
  carouselCtrl.editCarousel
);
router.delete(
  "/admin/carousel/delete/:id",
  VerifyAcceptToken,
  authAdmin,
  carouselCtrl.deleteCarousel
);
module.exports = router;
