const { set, get } = require("../../../utils/limited_redis");
const Category = require("../../../models/CategoryModel");

module.exports = {
  getAllCategory: async () => {
    const categories = await get("categories");
    if (categories) {
      return JSON.parse(categories);
    }
    const category = await Category.find();
    await set("categories", JSON.stringify(category));
    return category;
  },
};
