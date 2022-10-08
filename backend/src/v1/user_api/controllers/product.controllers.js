const { returnReasons } = require("../../middlewares/handleError");
const {
  HandleGetProduct,
  HandleGetProductDetail,
  handleAddToCart,
  handleInAndDecrementCart,
  handleDelCart,
  handleGetAddToCart,
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
  //* Get Product Detail
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
  //* Add To cart
  addToCartProduct: async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      const user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handleAddToCart({
        user_id,
        product_id,
        quantity,
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
  //* Increase and Decrease quantity:
  quantityCartProduct: async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      const user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handleInAndDecrementCart({
        user_id,
        product_id,
        quantity,
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
  //* Del cart
  delCartProduct: async (req, res) => {
    try {
      const { product_id } = req.body;
      const user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handleDelCart({
        user_id,
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
  getAddToCart: async (req, res) => {
    try {
      const user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handleGetAddToCart({
        user_id,
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
