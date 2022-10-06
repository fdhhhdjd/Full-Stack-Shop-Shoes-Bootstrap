const {
  updateOrderDelete,
  getAllOrder,
  updateStatusOrder,
  getDetailOrder,
  getAllOrderDelete,
} = require("./curd_order.service");

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
  handleGetAllOrderUsers: async () => {
    try {
      const order = await getAllOrder();
      return {
        status: 200,
        success: true,
        element: {
          order,
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
  handleGetAllOrderDeleteUsers: async () => {
    try {
      const order = await getAllOrderDelete();
      return {
        status: 200,
        success: true,
        element: {
          order,
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
  handleUploadStatus: async ({ order_status, id }) => {
    try {
      if (order_status !== "On Delivery" && order_status !== "Delivered") {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Please choose order status",
          },
        };
      }
      await updateStatusOrder(order_status, id);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Update order status successfully",
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
  handleGetDetail: async ({ order_id }) => {
    try {
      const Payment = await getDetailOrder(order_id);
      if (!Payment) {
        return n({
          status: 400,
          success: false,
          element: {
            msg: "Payments not found !!!",
          },
        });
      }
      return {
        status: 200,
        success: true,
        element: {
          msg: "Get Payments Detail Successfully !",
          Payment,
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
