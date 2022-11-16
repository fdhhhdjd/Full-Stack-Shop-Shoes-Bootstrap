const {
  uploadStorage,
  removeTmp,
  destroyStorage,
} = require("./uploadStorage.service");
const STORAGE = require("../../utils/storage");
module.exports = {
  handleUpload: async ({ file }) => {
    try {
      if (!file || Object.keys(file).length === 0) {
        return {
          status: 400,
          success: false,
          element: {
            msg: "No files were uploaded !!",
          },
        };
      }

      const file_upload = file.file;
      if (file_upload.size > 1024 * 1024) {
        removeTmp(file_upload.tempFilePath);
        return {
          status: 400,
          success: false,
          element: {
            msg: "Size too large !!",
          },
        };
      }
      const type = STORAGE.detectedFileType(file_upload.mimetype);
      if (type !== "image") {
        removeTmp(file_upload.tempFilePath);
        return {
          status: 400,
          success: false,
          element: {
            msg: "File format is incorrect !",
          },
        };
      }

      const result = await uploadStorage(file_upload);
      return {
        status: 200,
        success: true,
        element: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: { msg: "Server Busy !!" },
      };
    }
  },
  handleDestroy: async (public_id) => {
    try {
      if (!public_id) {
        return {
          status: 400,
          success: false,
          element: { msg: "No images Selected" },
        };
      }
      const results = await destroyStorage(public_id);
      return {
        status: 200,
        success: true,
        element: { results },
      };
    } catch (error) {
      return {
        status: 503,
        success: false,
        element: { msg: "Server Busy !!" },
      };
    }
  },
};
