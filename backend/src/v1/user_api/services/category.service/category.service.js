const { getAllCategory } = require("./Crudcategories.service");
module.exports = {
  HandleGetCategory: async () => {
    const category = await getAllCategory();
    return {
      status: 200,
      success: true,
      element: category,
    };
  },
};
