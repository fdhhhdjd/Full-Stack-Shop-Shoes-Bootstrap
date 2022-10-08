const { returnReasons } = require("../../middlewares/handleError");
const {
  handleHistoryOrder,
  handleDeleteFlagOrders,
  handleDetailOrders,
} = require("../services/order.service.js/history.service");
const paymentCtrl = {
  historyOrders: async (req, res) => {
    try {
      let user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handleHistoryOrder({
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
  deleteFlagOrders: async (req, res) => {
    try {
      let order_id = req.params.id;
      const { status, success, element } = await handleDeleteFlagOrders({
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
  getDetailOrders: async (req, res) => {
    try {
      let order_id = req.params.id;
      const { status, success, element } = await handleDetailOrders({
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
module.exports = paymentCtrl;
