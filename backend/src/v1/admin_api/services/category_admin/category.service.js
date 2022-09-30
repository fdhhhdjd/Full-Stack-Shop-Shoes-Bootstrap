const {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
} = require("./Crudcategories.service");
module.exports = {
  HandleGetCategory: async () => {
    const category = await getAllCategory();
    return {
      status: 200,
      success: true,
      element: category,
    };
  },
  handleCreateCategory: async ({ name, image }) => {
    const { status, success, element } = await createCategory(name, image);
    return {
      status,
      success,
      element,
    };
  },
  handleEditCategory: async ({ category_id, name, image }) => {
    const { status, success, element } = await editCategory(
      category_id,
      name,
      image
    );
    return {
      status,
      success,
      element,
    };
  },
  handleDeleteCategory: async ({ category_id }) => {
    const { status, success, element } = await deleteCategory(category_id);
    return {
      status,
      success,
      element,
    };
  },
};
