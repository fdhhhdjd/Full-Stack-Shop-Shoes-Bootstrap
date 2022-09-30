const router = require("express").Router();
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const authAdmin = require("../../middlewares/VerificationAdmin");
const categoriesCtrl = require("../controllers/category.controller");

//* Get All Category
router.get(
  "/category",
  VerifyAcceptToken,
  authAdmin,
  categoriesCtrl.getCategory
);

//* Create Category
router.post(
  "/category/create",
  VerifyAcceptToken,
  authAdmin,
  categoriesCtrl.createCategory
);
//* Edit Category

router.post(
  "/category/edit/:id",
  VerifyAcceptToken,
  authAdmin,
  categoriesCtrl.editCategory
);
//* Edit Category
router.delete(
  "/category/delete/:id",
  VerifyAcceptToken,
  authAdmin,
  categoriesCtrl.deleteCategory
);
module.exports = router;
