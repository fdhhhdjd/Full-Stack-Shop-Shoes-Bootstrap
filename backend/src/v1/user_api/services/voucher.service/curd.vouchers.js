const Voucher = require("../../../models/VoucherModel");
const checkVoucher = async (title) => {
  return Voucher.findOne({ title });
};
module.exports = {
  checkVoucher,
};
