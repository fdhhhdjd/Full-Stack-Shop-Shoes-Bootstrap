const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetallCarousel,
} = require("../services/carousel.service/carousel.service");
const carouselCtrl = {
  getallCarousel: async (req, res) => {
    try {
      const { status, success, element } = await handleGetallCarousel();
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
};
module.exports = carouselCtrl;
