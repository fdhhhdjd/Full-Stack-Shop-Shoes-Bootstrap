const { returnReasons } = require("../../middlewares/handleError");
const HELPER = require("../../utils/helper");
const {
  handleVoucher,
  handleDelVoucher,
} = require("../services/voucher.service/voucher.service");
const voucherCtrl = {
  addVoucher: async (req, res) => {
    try {
      let user_id = req.user.id || req.user.user_id;
      const { title } = req.body;
      const { status, success, element } = await handleVoucher({
        user_id,
        title,
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
  delVoucher: async (req, res) => {
    try {
      let user_id = req.user.id || req.user.user_id;
      const { status, success, element } = await handleDelVoucher(user_id);
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
