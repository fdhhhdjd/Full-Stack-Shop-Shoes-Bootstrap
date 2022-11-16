const mongoose = require("mongoose");
const Products = require("../../../models/ProductModel");
const HELPER = require("../../../utils/helper");
const CONTAINS = require("../../../configs/constants");
const REDIS = require("../../../db/redis_db");
module.exports = {
  createReview: async (product, review) => {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    try {
      const opts = { sess, returnOriginal: false };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save(opts);
      await resetRedisProduct();
      await sess.commitTransaction();
      sess.endSession();
      return {
        success: true,
      };
    } catch (error) {
      await sess.abortTransaction();
      sess.endSession();
      return {
        success: false,
      };
    }
  },
  editReview: async (product, comment, review_id, user_id, product_id) => {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    try {
      const opts = { sess, returnOriginal: false };
      for (var i = 0; i < product.reviews.length; i++) {
        if (
          product.reviews[i]._id == review_id &&
          product.reviews[i].user == user_id
        ) {
          product.reviews[i].comment = comment;
        }
      }
      await Products.findByIdAndUpdate(
        { _id: product_id },

        {
          updatedAt: Date.now,
        }
      );
      await product.save(opts);
      await sess.commitTransaction();
      sess.endSession();
      await resetRedisProduct();
      return {
        success: true,
      };
    } catch (error) {
      await sess.abortTransaction();
      sess.endSession();
      return {
        success: false,
      };
    }
  },
  deleteReview: async (product, user_id, product_id, review_id) => {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    try {
      const opts = { sess, returnOriginal: false };
      if (product) {
        for (var i = 0; i < product.reviews.length; i++) {
          if (
            product.reviews[i]._id == review_id &&
            product.reviews[i].user == user_id
          ) {
            product.reviews.splice(i, 1);
          }
        }

        product.numReviews = product.reviews.length;

        if (product.reviews.length === 0) {
          product.rating = 0;
        } else {
          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        }
      }
      await product.save(opts);
      await resetRedisProduct();
      sess.endSession();
      await resetRedisProduct();
      return {
        success: true,
      };
    } catch (error) {
      await sess.abortTransaction();
      sess.endSession();
      return {
        success: false,
      };
    }
  },
};
const resetRedisProduct = async () => {
  const random_number = HELPER.randomNumber();
  const product_user = await Products.find().sort({
    createdAt: 1,
  });
  let redis_multi = REDIS.pipeline()
    .del("product_user")
    .set(
      "product_user",
      JSON.stringify(product_user),
      CONTAINS._1_DAYS_REDIS + random_number
    );
  redis_multi.exec()

};
