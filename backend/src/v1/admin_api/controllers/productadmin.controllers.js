const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetallProduct,
  handleProductId,
  handleCreateProduct,
  handleEditProduct,
  handleDeleteProduct,
} = require("../services/product_admin/products.service");

const productCtrl = {
  //* Get all
  getallProduct: async (req, res) => {
    try {
      const { status, success, element } = await handleGetallProduct({ req });
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
  //* Get Detail
  getProductId: async (req, res) => {
    try {
      let product_id = req.params.id;
      const { status, success, element } = await handleProductId({
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
  //* Create Product
  createProduct: async (req, res) => {
    try {
      const {
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
        categories,
      } = req.body;
      const { status, success, element } = await handleCreateProduct({
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
        categories,
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
  //* Edit Product
  editProduct: async (req, res) => {
    try {
      const {
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
        categories,
      } = req.body;
      let product_id = req.params.id;
      const { status, success, element } = await handleEditProduct({
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
        categories,
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
  //* Delete Product
  deleteProduct: async (req, res) => {
    try {
      let product_id = req.params.id;
      const { status, success, element } = await handleDeleteProduct({
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
