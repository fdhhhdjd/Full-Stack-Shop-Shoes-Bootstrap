const Payments = require("../../../models/PaymentModel");
const CONSTANTS = require("../../../configs/constants");
const PASSWORD = require("../../../utils/password");
const STORAGE = require("../../../utils/storage");
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
  handleDeleteFlagOrders: async ({ order_id, password, user_id }) => {
    try {
      const user_email = await STORAGE.checkUserIdExit(user_id);
      if (!user_email) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "User Not Exit",
          },
        }
      }
      const user_password = await PASSWORD.comparePassword(
        password,
        user_email.password
      );
      if (!user_password) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Password correct",
          },
        }
      }
      await Payments.findByIdAndUpdate(
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
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
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
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
};
