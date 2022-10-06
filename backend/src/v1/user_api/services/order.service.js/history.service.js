const Payments = require("../../../models/PaymentModel");
const CONSTANTS = require("../../../configs/constants");
module.exports = {
  handleHistoryOrder: async ({ user_id }) => {
    try {
      const history = await Payments.find({
        user_id,
        deleteAt: CONSTANTS.DELETED_DISABLE,
      }).sort({ createdAt: -1 });
      return {
        status: 200,
        success: true,
        element: {
          msg: "Get History Successfully",
          history,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleDeleteFlagOrders: async ({ order_id }) => {
    try {
      await Payments.findOneAndUpdate(
        { _id: order_id },
        {
          deleteAt: CONSTANTS.DELETED_ENABLE,
        }
      );
      return {
        status: 200,
        success: true,
        element: {
          msg: "Delete Payment Successfully",
        },
      };
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  handleDetailOrders: async ({ order_id }) => {
    try {
      const payment = await Payments.findById(order_id);
      return {
        status: 200,
        success: true,
        element: {
          payment,
        },
      };
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
