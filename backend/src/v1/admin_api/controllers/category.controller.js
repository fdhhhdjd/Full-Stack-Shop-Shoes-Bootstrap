const { returnReasons } = require("../../middlewares/handleError");
const {
  HandleGetCategory,
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
} = require("../services/category_admin/category.service");

const categoriesCtrl = {
  //* Get All Category
  getCategory: async (req, res) => {
    try {
      const { status, success, element } = await HandleGetCategory();
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Create Category
  createCategory: async (req, res) => {
    try {
      const { name, image } = req.body;
      const { status, success, element } = await handleCreateCategory({
        name,
        image,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* Edit Category
  editCategory: async (req, res) => {
    try {
      const { name, image } = req.body;
      let category_id = req.params.id;
      const { status, success, element } = await handleEditCategory({
        category_id,
        name,
        image,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
  //* deleteCategory
  deleteCategory: async (req, res) => {
    try {
      let category_id = req.params.id;
      const { status, success, element } = await handleDeleteCategory({
        category_id,
      });
      return res.status(status).json({
        status,
        success,
        msg: returnReasons(status.toString()),
        element,
      });
    } catch (error) {
      return res.status(503).json({
        status: 503,
        success: false,
        element: returnReasons("503"),
      });
    }
  },
};
module.exports = categoriesCtrl;
