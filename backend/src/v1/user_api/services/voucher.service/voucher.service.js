const { set, get, del } = require("../../../utils/limited_redis");
const { checkVoucher } = require("./curd.vouchers");
const CONSTANTS = require("../../../configs/constants");
module.exports = {
  handleVoucher: async ({ user_id, title }) => {
    const check_voucher = await checkVoucher(title);
    if (!check_voucher)
      return {
        status: 400,
        success: false,
        element: {
          msg: "This Voucher already exists.",
        },
      };
    await set(
      `voucher_userId:${user_id}`,
      check_voucher.value,
      CONSTANTS._15_MINUTES_REDIS
    );
    try {
      return {
        status: 200,
        success: true,
        element: {
          msg: "Apply voucher Successfully !!",
        },
      };
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  handleDelVoucher: async (user_id) => {
    let voucher_save_redis = await get(`voucher_userId:${user_id}`);
    if (!voucher_save_redis) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "No Voucher",
        },
      };
    }
    await del(`voucher_userId:${user_id}`);
    return {
      status: 200,
      success: true,
      element: {
        msg: "Del voucher Success !!",
      },
    };
  },
};
