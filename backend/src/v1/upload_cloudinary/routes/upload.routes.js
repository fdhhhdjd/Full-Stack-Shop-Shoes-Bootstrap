const router = require("express").Router();
const uploadCtrl = require("../controllers/upload.controllers");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");

//* upload
router.post("/upload", VerifyAcceptToken, uploadCtrl.uploadCloudinary);

//* destroy
router.post("/destroy", VerifyAcceptToken, uploadCtrl.destroyCloudinary);
module.exports = router;
