const {
  hgetall,
  sumQuantity,
  get,
  del,
  RedisPub,
} = require("../../../utils/limited_redis");
const { createPayment } = require("./curd_payment.service");
const Products = require("../../../models/ProductModel");
const STORAGE = require("../../../utils/storage");
module.exports = {
  handlePaymentTotal: async ({ user_id }) => {
    if (!user_id) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "User Fail !",
        },
      };
    }
    const data = await hgetall(user_id);
    const quantity_sum = await sumQuantity({ user_id });

    var cart = [];
    for (var key in data) {
      cart.push({
        cart: await Products.find({ _id: key }),
        quantity_sum,
      });
    }
    let total = 0;
    let total_apply_voucher = 0;
    const voucher = await get(`voucher_userId:${user_id}`);
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].cart[0].price * cart[i].quantity_sum;
    }
    total_apply_voucher = (total * JSON.parse(voucher)) / 100;
    return {
      status: 200,
      success: true,
      element: {
        total,
        voucher: JSON.parse(voucher),
        total_apply_voucher,
      },
    };
  },
  handleCheckInStock: async ({ user_id }) => {
    const data = await hgetall(user_id);
    var cart = [];
    for (var key in data) {
      cart.push({
        cart: await Products.find({ _id: key }),
      });
    }
    let stockAvailable = true;
    let outOfStock = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].cart[0].countInStock === 0) {
        stockAvailable = false;
        outOfStock.push({
          outOfStock: cart[i].cart[0],
        });
      }
    }
    return {
      status: 200,
      success: true,
      element: {
        stockAvailable,
        outOfStock,
      },
    };
  },
  handlePaymentPaypal: async ({ user_id, paymentID, address }) => {
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
    const { success, element } = await createPayment({
      user_id,
      cart,
      paymentID,
      address,
      total,
      total_apply_voucher,
      voucher: JSON.parse(voucher),
    });
    if (!success) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Payment Paypal Fail !!!",
        },
      };
    }
    await RedisPub(
      "user_payment_success",
      JSON.stringify({
        email: element?.email,
        name: element?.name,
      })
    );
    for (let i = 0; i < cart.length; i++) {
      STORAGE.sold(cart[i].cart[0]._id, cart[i].quantity, cart[i].cart[0].sold);
      STORAGE.stock(
        cart[i].cart[0]._id,
        cart[i].quantity,
        cart[i].cart[0].countInStock
      );
    }
    await del(`cartUserId:${user_id}`);
    return {
      status: 200,
      success: true,
      element: {
        msg: "Payment Paypal Success !!",
      },
    };
  },
};
