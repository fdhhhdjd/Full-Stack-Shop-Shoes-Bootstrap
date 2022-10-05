const Voucher = require("../../../models/VoucherModel");
const checkVoucher = async (title) => {
  return await Voucher.findOne({ title });
};
module.exports = {
  checkVoucher,
};
