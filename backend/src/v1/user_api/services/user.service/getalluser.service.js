const Users = require("../../../models/userModel");
const { set } = require("../../../utils/limited_redis");
const getProfileId = async (userId) => {
  const user = await Users.findById(userId).select("-password");
  if (user) {
    await set(`userId:${userId}`, JSON.stringify(user));
  }
  return user;
};
module.exports = {
  getProfileId,
};
