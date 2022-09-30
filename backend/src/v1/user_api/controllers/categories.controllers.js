const { returnReasons } = require("../../middlewares/handleError");
const {
  HandleGetCategory,
} = require("../services/category.service/category.service");

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
};
module.exports = categoriesCtrl;
