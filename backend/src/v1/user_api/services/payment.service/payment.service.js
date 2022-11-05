const Stripe = require("stripe");
const {
  hgetall,
  sumQuantity,
  get,
  RedisPub,
} = require("../../../utils/limited_redis");
const { createPayment, handlePayment, handlePaymentSuccess } = require("./curd_payment.service");
const Products = require("../../../models/ProductModel");
const CONFIGS = require("../../../configs/config")
const stripe = new Stripe(CONFIGS.STRIPE_KEY);
module.exports = {
  handlePaymentTotal: async ({ user_id }) => {
    try {
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
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handleCheckInStock: async ({ user_id }) => {
    try {
      const data = await hgetall(user_id);
      var cart = [];
      for (var key in data) {
        cart.push({
          cart: await Products.find({ '_id': { $in: [key] } }),
          quantity: data[key]
        });
      }
      let stockAvailable = true;
      let outOfStock = [];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].cart[0].countInStock === 0 || cart[i].quantity > cart[i].cart[0].countInStock) {
          stockAvailable = false;
          outOfStock.push({
            outOfStock: cart[i].cart[0].name,
            stock: cart[i].cart[0].countInStock,
          });
        }
      }
      return {
        status: stockAvailable ? 200 : 400,
        success: stockAvailable ? true : false,
        element: {
          stockAvailable,
          outOfStock,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handlePaymentPaypal: async ({ user_id, paymentID, address }) => {
    try {
      let { cart, total, total_apply_voucher, voucher } = await handlePayment({ user_id });

      const { success, element } = await createPayment({
        user_id,
        cart,
        paymentID,
        address,
        total,
        total_apply_voucher,
        voucher: voucher,
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
      RedisPub(
        "user_payment_success",
        JSON.stringify({
          email: element?.email,
          name: element?.name,
        })
      );
      handlePaymentSuccess({ cart, user_id })
      return {
        status: 200,
        success: true,
        element: {
          msg: "Payment Paypal Success !!",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handlePaymentStripe: async ({ user_id, req }) => {
    let UserId = await get(`userId:${user_id}`)
    let data = await hgetall(user_id);
    UserId = JSON.parse(UserId)
    var cart = [];
    for (var key in data) {
      cart.push({
        cart: await Products.find({ _id: key }),
        quantity: data[key],
      });
    }
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer_email: UserId.email,
      line_items: cart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.cart[0].name,
              images: [item.cart[0].image.url],
              description: item.cart[0].description,
            },
            unit_amount: item.cart[0].price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),

      // success_url: `${req.protocol}://${req.get("host")}/api/payment/stripe/success/{CHECKOUT_SESSION_ID}/${UserId._id}`,
      // cancel_url: `${req.protocol}://${req.get("host")}/api/payment/cancel`,
      success_url: `http://localhost:3000/payment/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cart`,
    };
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);

    return {
      status: 200,
      success: true,
      element: {
        payment_url: session.url,
        msg: "Url Payment Stripe !!",
      },
    };
  },
  handlePaymentStripeSuccess: async ({ payment_id, user_id }) => {
    try {
      //data Stripe
      const session = await stripe.checkout.sessions.retrieve(payment_id);
      const customer = await stripe.customers.retrieve(session.customer);

      //Save Db
      let { cart, total, total_apply_voucher, voucher } = await handlePayment({ user_id });
      const { success, element } = await createPayment({
        user_id,
        cart,
        paymentID: customer.id,
        address: customer.shipping.address,
        total,
        total_apply_voucher,
        voucher: voucher,
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
      RedisPub(
        "user_payment_success",
        JSON.stringify({
          email: element?.email,
          name: element?.name,
        })
      );
      handlePaymentSuccess({ cart, user_id })
      return {
        status: 200,
        success: true,
        element: {
          msg: "Payment Stripe Success !!",
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: {
          msg: "Server busy !!",
        },
      };
    }
  },
  handlePaymentStripeCancel: async () => {
    return {
      status: 200,
      success: true,
      element: {
        msg: "Payment Paypal Cancel !!",
      },
    };
  }
};
