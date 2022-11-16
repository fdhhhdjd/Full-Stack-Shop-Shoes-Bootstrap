const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetallCarousel,
  handleCreateCarousel,
  handleEditCarousel,
  handleDeleteCarousel,
} = require("../services/carousel_admin/carousel.service");
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
  createCarousel: async (req, res) => {
    try {
      const { heading, descriptions, image } = req.body;
      const { status, success, element } = await handleCreateCarousel({
        heading,
        descriptions,
        image,
      });
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
  editCarousel: async (req, res) => {
    try {
      const { heading, descriptions, image } = req.body;
      const _id = req.params.id;
      const { status, success, element } = await handleEditCarousel({
        heading,
        descriptions,
        image,
        _id,
      });
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
  deleteCarousel: async (req, res) => {
    try {
      const _id = req.params.id;

      const { status, success, element } = await handleDeleteCarousel({ _id });
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
