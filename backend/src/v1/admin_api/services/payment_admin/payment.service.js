const { updateOrderDelete } = require("./curd_payment.service");

module.exports = {
  handleUpdateOrderDeleteUsers: async (payment_id) => {
    try {
      await updateOrderDelete(payment_id);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Undo Payment Successfully",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server Fail !!",
        },
      };
    }
  },
};
