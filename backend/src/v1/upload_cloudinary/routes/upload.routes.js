const router = require("express").Router();
const uploadCtrl = require("../controllers/upload.controllers");
const VerifyAcceptToken = require("../../middlewares/VerifyAcceptToken.middleware");
const RateLimitMiddleware = require("../../middlewares/ratelimit.middleware")

//* upload
router.post("/upload", VerifyAcceptToken, RateLimitMiddleware, uploadCtrl.uploadCloudinary);

//* destroy
router.post("/destroy", VerifyAcceptToken, RateLimitMiddleware, uploadCtrl.destroyCloudinary);
module.exports = router;
