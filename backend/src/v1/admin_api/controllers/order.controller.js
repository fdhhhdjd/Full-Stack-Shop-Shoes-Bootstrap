const { returnReasons } = require("../../middlewares/handleError");
const {
  handleUpdateOrderDeleteUsers,
  handleGetAllOrderUsers,
  handleUploadStatus,
  handleGetDetail,
  handleGetAllOrderDeleteUsers,
} = require("../services/order_admin/order.service");

module.exports = {
  //* Undo order delete
  updateOrderDeleteUser: async (req, res) => {
    try {
      const payment_id = req.params.id;
      const { status, success, element } = await handleUpdateOrderDeleteUsers(
        payment_id
      );
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
  //* Get all orders
  GetAllOrderUsers: async (req, res) => {
    try {
      const { status, success, element } = await handleGetAllOrderUsers();
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
  //* Get all orders delete
  GetAllOrderUsersDelete: async (req, res) => {
    try {
      const { status, success, element } = await handleGetAllOrderDeleteUsers();
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
  //* Update status orders
  updateStatusOrders: async (req, res) => {
    try {
      const id = req.params.id;
      const { order_status } = req.body;
      const { status, success, element } = await handleUploadStatus({
        order_status,
        id,
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
  //* Get detail orders
  detailOrder: async (req, res) => {
    try {
      const order_id = req.params.id;
      const { status, success, element } = await handleGetDetail({
        order_id,
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
