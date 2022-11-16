const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
const Products = require("../../../models/ProductModel");
const { get, set } = require("../../../utils/limited_redis");
module.exports = {
  async getallProductUser() {
    try {
      const product_user_redis = await get("product_user");
      if (product_user_redis) {
        return JSON.parse(product_user_redis);
      }
      const number_random = HELPER.randomNumber();
      const product_user = await Products.aggregate([
        {
          $project: {
            _id: "$_id",
            name: "$name",
            price: "$price",
            image: "$image",
            description: "$description",
            rating: "$rating",
            numReviews: "$numReviews",
            sold: "$sold",
            countInStock: "$countInStock",
            categories: "$categories",
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
      set(
        "product_user",
        JSON.stringify(product_user),
        CONSTANTS._1_DAYS_REDIS + number_random
      );
      return product_user;
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
  async getallProductUserDetail(product_id) {
    try {
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
};
