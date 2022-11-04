const { returnReasons } = require("../../middlewares/handleError");
const {
  handlePaymentTotal,
  handleCheckInStock,
  handlePaymentPaypal,
  handlePaymentStripe,
  handlePaymentStripeSuccess,
  handlePaymentStripeCancel
} = require("../services/payment.service/payment.service");
const paymentCtrl = {
  totalPayment: async (req, res) => {
    try {
      let user_id = req.user.id || req.user.user_id;
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
      let user_id = req.user.id || req.user.user_id;
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
      let user_id = req.user.id || req.user.user_id;
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
  paymentStripe: async (req, res) => {
    try {
      let user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handlePaymentStripe({
        user_id,
        req
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
  paymentStripeSuccess: async (req, res) => {
    try {
      let payment_id = req.params.id;
      let user_id = req.params.user_id;

      const { status, success, element } = await handlePaymentStripeSuccess({
        payment_id,
        user_id
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
  paymentStripeCancel: async (req, res) => {
    try {

      const { status, success, element } = await handlePaymentStripeCancel();
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
