const fs = require("fs");
const cloudinary = require("../../db/cloudinary_db");
const uploadStorage = async (file_upload) => {
  let data = null;
  await cloudinary.v2.uploader.upload(
    file_upload.tempFilePath,
    { folder: "user" },
    async (err, result) => {
      if (err) throw (data = err);
      removeTmp(file_upload.tempFilePath);
      return (data = result);
    }
  );
  return data;
};
const destroyStorage = async (public_id) => {
  console.log(public_id);
  let results = null;
  await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
    if (err) throw (results = err);
    results = result;
  });
  return results;
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = {
  uploadStorage,
  destroyStorage,
  removeTmp,
};
