const CONSTANTS = require("../../../configs/constants");
const Products = require("../../../models/ProductModel");
const HELPER = require("../../../utils/helper");
const { set, del } = require("../../../utils/limited_redis");
//* Get Id product
const getProductId = async (product_id) => {
  const product = await Products.findById(product_id).populate({
    path: "reviews",
    populate: {
      path: "user",
    },
  });
  return product;
};
//* create Product
const createProductNew = async (
  name,
  image,
  description,
  rating,
  price,
  countInStock,
  numReviews,
  categories
) => {
  const newProduct = new Products({
    name,
    image,
    description,
    rating,
    price,
    countInStock,
    numReviews,
    categories,
  });
  await newProduct.save();
  await resetCreateEditRedis();
  return;
};
//* Edit Product
const editProductNew = async (
  name,
  image,
  description,
  rating,
  price,
  countInStock,
  numReviews,
  categories,
  product_id
) => {
  await Products.findOneAndUpdate(
    { _id: product_id },
    {
      name,
      image,
      description,
      rating,
      price,
      countInStock,
      numReviews,
      categories,
    }
  );
  await resetCreateEditRedis();
  return;
};
//* Delete Product
const deleteProduct = async (product_id) => {
  await Products.findByIdAndDelete(product_id);
  await resetCreateEditRedis();
  return;
};
const resetCreateEditRedis = async () => {
  const random_number = HELPER.randomNumber();
  await del("product_user");
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
    CONSTANTS._1_DAY + random_number
  );
};
module.exports = {
  getProductId,
  createProductNew,
  editProductNew,
  deleteProduct,
};
