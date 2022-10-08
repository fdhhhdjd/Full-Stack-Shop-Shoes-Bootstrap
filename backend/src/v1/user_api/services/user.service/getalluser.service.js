const Users = require("../../../models/userModel");
const HELPER = require("../../../utils/helper");
const CONTAINS = require("../../../configs/constants");
const { set, get, del } = require("../../../utils/limited_redis");
const getProfileId = async (userId) => {
  const user_redis = await get(`userId:${userId}`);
  if (user_redis) {
    return JSON.parse(user_redis);
  }
  const random_number = HELPER.randomNumber();
  const user = await Users.findById(userId).select("+password");
  if (user) {
    await set(
      `userId:${userId}`,
      JSON.stringify(user),
      CONTAINS._1_DAYS_REDIS + random_number
    );
  }
  return user;
};
const updateProfileId = async (userId) => {
  await del(`userId:${userId}`);
  const random_number = HELPER.randomNumber();
  const user = await Users.findById(userId).select("+password");
  if (user) {
    await set(
      `userId:${userId}`,
      JSON.stringify(user),
      CONTAINS._1_DAY + random_number
    );
  }
  return user;
};

module.exports = {
  getProfileId,
  updateProfileId,
};
