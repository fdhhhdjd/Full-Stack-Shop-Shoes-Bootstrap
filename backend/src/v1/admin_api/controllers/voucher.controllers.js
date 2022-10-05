const { returnReasons } = require("../../middlewares/handleError");
const {
  handleGetallVoucher,
  handleCreateVoucher,
  handleUpdateVoucher,
  handleDeleteVoucher,
} = require("../services/voucher_admin/voucher.service");

const voucherCtrl = {
  //* Get All Voucher
  getVoucher: async (req, res) => {
    try {
      const { status, success, element } = await handleGetallVoucher();
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
  //* Create Voucher
  createVoucher: async (req, res) => {
    try {
      const { title, value } = req.body;
      const { status, success, element } = await handleCreateVoucher({
        title,
        value,
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
  //* Edit Voucher
  editVoucher: async (req, res) => {
    try {
      const { title, value } = req.body;
      let voucher_id = req.params.id;
      const { status, success, element } = await handleUpdateVoucher({
        voucher_id,
        title,
        value,
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
  //* deleteVoucher
  deleteVoucher: async (req, res) => {
    try {
      let voucher_id = req.params.id;
      const { status, success, element } = await handleDeleteVoucher({
        voucher_id,
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
module.exports = voucherCtrl;
