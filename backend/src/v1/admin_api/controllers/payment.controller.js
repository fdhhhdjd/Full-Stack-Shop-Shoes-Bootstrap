const { returnReasons } = require("../../middlewares/handleError");
const {
  handleUpdateOrderDeleteUsers,
} = require("../services/payment_admin/payment.service");

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
};
