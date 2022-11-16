const {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  delVoucher,
} = require("./curd_voucher.service");
const STORAGE = require("../../../utils/storage");
module.exports = {
  handleGetallVoucher: async () => {
    try {
      const voucher = await getAllVoucher();
      if (voucher.length === 0) {
        return {
          status: 200,
          success: true,
          element: {
            msg: "Voucher Empty !!",
          },
        };
      }
      return {
        status: 200,
        success: true,
        element: {
          voucher,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server Busy",
        },
      };
    }
  },
  handleCreateVoucher: async ({ title, value }) => {
    try {
      const check_exit = await STORAGE.checkVoucherExit(title);
      if (check_exit.length > 0) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Voucher Exit !!",
          },
        };
      }
      await createVoucher(title, value);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Voucher create Success !!",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server Busy",
        },
      };
    }
  },
  handleUpdateVoucher: async ({ voucher_id, title, value }) => {
    try {
      const check_exit = await STORAGE.checkVoucherExitExceptUserMain(
        voucher_id,
        title
      );
      if (check_exit.length > 0) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "Voucher Exit !!",
          },
        };
      }
      await updateVoucher(voucher_id, title, value);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Voucher update Success !!",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server Busy",
        },
      };
    }
  },
  handleDeleteVoucher: async ({ voucher_id }) => {
    try {
      if (!voucher_id) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "server Fail !!",
          },
        };
      }
      await delVoucher(voucher_id);
      return {
        status: 200,
        success: true,
        element: {
          msg: "Voucher Delete Success !!",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server Busy",
        },
      };
    }
  },
};
