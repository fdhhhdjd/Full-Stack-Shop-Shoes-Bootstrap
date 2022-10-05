const mongoose = require("mongoose");
const Payments = require("../../../models/PaymentModel");
const Users = require("../../../models/userModel");
const createPayment = async ({
  user_id,
  paymentID,
  address,
  total,
  total_apply_voucher,
  voucher,
}) => {
  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    const opts = { sess, returnOriginal: false };
    const user = await getUserId(user_id);
    const { name, email } = user;
    const newPayment = new Payments({
      user_id: user_id,
      name,
      email,
      cost: total,
      voucher: !voucher ? 0 : voucher,
      discount: total_apply_voucher,
      total: total,
      paymentID,
      address,
      status: true,
    });
    await newPayment.save(opts);
    await sess.commitTransaction();
    sess.endSession();
    return {
      success: true,
      element: user,
    };
  } catch (error) {
    console.log(error);

    await sess.abortTransaction();
    sess.endSession();
    return {
      success: false,
      element: {
        msg: false,
      },
    };
  }
};
const getUserId = async (user_id) => {
  return await Users.findById(user_id).select(
    "name email total_cart discount voucher"
  );
};
module.exports = {
  createPayment,
  getUserId,
};
