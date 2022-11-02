const { set, get } = require("../../../utils/limited_redis");
const Category = require("../../../models/CategoryModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
module.exports = {
  getAllCategory: async () => {
    const categories = await get("categories");
    if (categories) {
      return JSON.parse(categories);
    }
    const number_random = HELPER.randomNumber();

    const category = await Category.find();
    set(
      "categories",
      JSON.stringify(category),
      CONSTANTS._1_DAYS_REDIS + number_random
    );
    return category;
  },
};
