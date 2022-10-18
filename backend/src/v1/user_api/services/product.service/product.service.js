const {
  hmset,
  hincrby,
  delCart,
  hgetall,
  hlen,
  sumQuantity,
  exists,
} = require("../../../utils/limited_redis");
const {
  getallProductUser,
  getallProductUserDetail,
} = require("./getproduct.service");
const Products = require("../../../models/ProductModel");
const {
  handleGetCommentProductId,
} = require("../review.service/review.service");
module.exports = {
  HandleGetProduct: async () => {
    const products = await getallProductUser();
    return {
      status: 200,
      success: true,
      element: products,
    };
  },
  HandleGetProductDetail: async ({ product_id }) => {
    const product_detail = await getallProductUserDetail(product_id);
    return {
      status: 200,
      success: true,
      element: {
        product_detail,
        comment: await handleGetCommentProductId(product_id),
      },
    };
  },
  handleAddToCart: async ({ user_id, product_id, quantity }) => {
    await hmset(user_id, product_id, quantity);
    return {
      status: 200,
      success: true,
      msg: "Add to cart Success !!!",
    };
  },
  handleInAndDecrementCart: async ({ user_id, product_id, quantity }) => {
    await hincrby(user_id, product_id, quantity);
    return {
      status: 200,
      success: true,
      msg: "Hincrby to cart Success !!!",
    };
  },
  handleDelCart: async ({ user_id, product_id }) => {
    await delCart(user_id, product_id);
    return {
      status: 200,
      success: true,
      msg: "Del to  cart Success !!!",
    };
  },
  handleGetAddToCart: async ({ user_id }) => {
    const cart_exit = await exists(`cartUserId:${user_id}`);
    if (cart_exit === 0) {
      return {
        status: 200,
        success: true,
        element: {
          msg: "Cart Empty !!!",
        },
      };
    }
    const data = await hgetall(user_id);
    const data_length = await hlen(user_id);
    const quantity_sum = await sumQuantity({ user_id });
    var product = [];
    for (var key in data) {
      product.push({
        product_id: await Products.find({
          _id: key,
        }),
        quantity: data[key],
      });
    }

    return {
      status: 200,
      success: true,
      element: {
        product,
        data_length,
        quantity_sum,
      },
    };
  },
};
