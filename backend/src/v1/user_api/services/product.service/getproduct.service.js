const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
const Products = require("../../../models/ProductModel");
const { get, set } = require("../../../utils/limited_redis");
module.exports = {
  async getallProductUser() {
    const product_user_redis = await get("product_user");
    if (product_user_redis) {
      return JSON.parse(product_user_redis);
    }
    const number_random = HELPER.randomNumber();
    const product_user = await Products.aggregate([
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
    await set(
      "product_user",
      JSON.stringify(product_user),
      CONSTANTS._1_DAYS_REDIS + number_random
    );
    return product_user;
  },
  async getallProductUserDetail(product_id) {
    var product_user_redis = await get("product_user");
    product_user_redis = JSON.parse(product_user_redis);
    if (product_user_redis) {
      return product_user_redis.filter((x) => x._id === product_id);
    }
    const product_detail = await Products.findById(product_id).populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    });
    return product_detail;
  },
};
