const mongoose = require("mongoose");
const Payments = require("../../../models/PaymentModel");
const Users = require("../../../models/userModel");
const Products = require("../../../models/ProductModel");
const STORAGE = require("../../../utils/storage");
const REDIS = require("../../../db/redis_db")
const {
  get,
  hgetall
} = require("../../../utils/limited_redis");
const createPayment = async ({
  user_id,
  cart,
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
      cart,
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
const handlePayment = async ({ user_id }) => {
  const data = await hgetall(user_id);
  var cart = [];
  for (var key in data) {
    cart.push({
      cart: await Products.find({ _id: key }),
      quantity: data[key],
    });
  }
  let total = 0;
  let total_apply_voucher = 0;
  const voucher = await get(`voucher_userId:${user_id}`);
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].cart[0].price * cart[i].quantity;
  }
  total_apply_voucher = (total * JSON.parse(voucher)) / 100;

  return { cart, total, total_apply_voucher, voucher: JSON.parse(voucher) };
}
const handlePaymentSuccess = async ({ cart, user_id }) => {
  for (let i = 0; i < cart.length; i++) {
    STORAGE.sold(cart[i].cart[0]._id, cart[i].quantity, cart[i].cart[0].sold);
    STORAGE.stock(
      cart[i].cart[0]._id,
      cart[i].quantity,
      cart[i].cart[0].countInStock
    );
  }
  let redis_multi = REDIS.pipeline().del(`cartUserId:${user_id}`).del("product_user").del(`voucher_userId:${user_id}`)
  redis_multi.exec()
}
module.exports = {
  createPayment,
  getUserId,
  handlePayment,
  handlePaymentSuccess
};
