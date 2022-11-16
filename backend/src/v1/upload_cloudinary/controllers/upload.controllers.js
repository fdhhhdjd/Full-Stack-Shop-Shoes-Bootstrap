const { returnReasons } = require("../../middlewares/handleError");
const { handleUpload, handleDestroy } = require("../services/upload.service");
const uploadCtrl = {
  uploadCloudinary: async (req, res, next) => {
    try {
      let file = req.files;
      const { status, success, element } = await handleUpload({ file });
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
  destroyCloudinary: async (req, res, next) => {
    try {
      const { public_id } = req.body;
      const { status, success, element } = await handleDestroy(public_id);
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
module.exports = uploadCtrl;
