const { returnReasons } = require("../../middlewares/handleError");
const {
  HandleGetProduct,
  HandleGetProductDetail,
} = require("../services/product.service/product.service");

const productCtrl = {
  //* Get All Product
  getProducts: async (req, res) => {
    try {
      const { status, success, element } = await HandleGetProduct();
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
  getProductDetail: async (req, res) => {
    try {
      let product_id = req.params.id;
      const { status, success, element } = await HandleGetProductDetail({
        product_id,
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
};
module.exports = productCtrl;
