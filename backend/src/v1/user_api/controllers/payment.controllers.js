const { returnReasons } = require("../../middlewares/handleError");
const {
  handlePaymentTotal,
  handleCheckInStock,
  handlePaymentPaypal,
} = require("../services/payment.service/payment.service");
const paymentCtrl = {
  totalPayment: async (req, res) => {
    try {
      let user_id = req.user.id;
      const { status, success, element } = await handlePaymentTotal({
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
  countInStock: async (req, res) => {
    try {
      let user_id = req.user.id;
      const { status, success, element } = await handleCheckInStock({
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
  paymentPaypal: async (req, res) => {
    try {
      let user_id = req.user.id;
      const { paymentID, address } = req.body;
      const { status, success, element } = await handlePaymentPaypal({
        user_id,
        paymentID,
        address,
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
