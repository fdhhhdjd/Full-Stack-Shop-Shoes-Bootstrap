const router = require("express").Router();
const adminCtrl = require("../controllers/admin.controllers");

router.route("/admin/login").get(adminCtrl.loginAdmin);

module.exports = router;
