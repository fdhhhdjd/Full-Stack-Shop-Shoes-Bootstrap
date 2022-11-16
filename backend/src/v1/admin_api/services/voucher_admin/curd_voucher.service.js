const Vouchers = require("../../../models/VoucherModel");
const getAllVoucher = async () => {
  return await Vouchers.aggregate([
    {
      $project: {
        doc: "$$ROOT",
        latest: {
          $cond: {
            if: { $gt: ["$createdAt", "$updatedAt"] },
            then: "$createdAt",
            else: "$updatedAt",
          },
        },
      },
    },
    { $sort: { latest: -1 } },
  ]);
};
const createVoucher = async (title, value) => {
  const newVoucher = new Vouchers({ title, value });
  await newVoucher.save();
};
const updateVoucher = async (voucher_id, title, value) => {
  await Vouchers.findOneAndUpdate({ _id: voucher_id }, { title, value });
};
const delVoucher = async (voucher_id) => {
  await Vouchers.findByIdAndDelete(voucher_id);
};
module.exports = {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  delVoucher,
};
