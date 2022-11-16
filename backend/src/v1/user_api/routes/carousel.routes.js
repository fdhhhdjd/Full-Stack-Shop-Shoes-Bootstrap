const router = require("express").Router();
const carouselCtrl = require("../controllers/carousel.controller");

//* Get All carousel
router.get("/carousel", carouselCtrl.getallCarousel);
module.exports = router;
