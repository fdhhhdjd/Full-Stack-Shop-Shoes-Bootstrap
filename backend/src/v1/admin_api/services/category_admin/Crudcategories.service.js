const { set, get, del } = require("../../../utils/limited_redis");
const Category = require("../../../models/CategoryModel");
const Products = require("../../../models/ProductModel");
const STORAGE = require("../../../utils/storage");
const HELPER = require("../../../utils/helper");
const CONSTANTS = require("../../../configs/constants");
module.exports = {
  getAllCategory: async () => {
    const number_random = HELPER.randomNumber();
    const categories = await get("categories");
    if (categories) {
      return JSON.parse(categories);
    }
    const category = await Category.find();
    await set(
      "categories",
      JSON.stringify(category),
      CONSTANTS._1_DAYS_REDIS + number_random
    );
    return category;
  },
  createCategory: async (name, image) => {
    const category_exit = await STORAGE.checkCategoryExit(name);
    if (category_exit) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Category Exits !!!",
        },
      };
    }
    const newCategory = new Category({ name, image });
    await newCategory.save();
    await resetCreateEditRedis();
    return {
      status: 200,
      success: true,
      element: {
        msg: "Create Category Success !!!",
      },
    };
  },
  editCategory: async (category_id, name, image) => {
    const category_exit = await STORAGE.checkCategoryExitExceptUserMain(
      category_id,
      name
    );
    if (category_exit.length > 0) {
      return {
        status: 400,
        success: false,
        element: {
          msg: "Category Exits !!!",
        },
      };
    }
    await Category.findOneAndUpdate({ _id: category_id }, { name, image });
    await resetCreateEditRedis();
    return {
      status: 200,
      success: true,
      element: {
        msg: "Edit Category Success !!!",
      },
    };
  },
  deleteCategory: async (category_id) => {
    if (!category_id) {
      return {
        status: 404,
        success: false,
        element: {
          msg: "Delete Not Found",
        },
      };
    }
    const products = await Products.findOne({ categories: category_id });
    if (products)
      return res.json({
        status: 400,
        success: false,
        msg: "Please delete all products with a relationship.",
      });
    await Category.findByIdAndDelete(category_id);
    await resetCreateEditRedis();
    return {
      status: 200,
      success: true,
      element: {
        msg: "Delete Category Success !!!",
      },
    };
  },
};
const resetCreateEditRedis = async () => {
  await del("categories");
  const category = await Category.find();
  await set("categories", JSON.stringify(category));
};
