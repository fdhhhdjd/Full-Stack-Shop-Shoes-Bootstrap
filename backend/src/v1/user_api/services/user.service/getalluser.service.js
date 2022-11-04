const Users = require("../../../models/userModel");
const Orders = require("../../../models/PaymentModel");
const HELPER = require("../../../utils/helper");
const CONTAINS = require("../../../configs/constants");
const { set, get, del } = require("../../../utils/limited_redis");
const REDIS = require("../../../db/redis_db");
const getProfileId = async (userId) => {
  const user_redis = await get(`userId:${userId}`);
  if (user_redis) {
    return JSON.parse(user_redis);
  }
  const random_number = HELPER.randomNumber();
  const user = await Users.findById(userId).select("+password");
  if (user) {
    set(
      `userId:${userId}`,
      JSON.stringify(user),
      CONTAINS._1_DAYS_REDIS + random_number
    );
  }
  return user;
};
const getInfoEveryUser = async (userId) => {
  const user = await Users.findById(userId).select(
    "name email phone date_of_birth image sex phone_number"
  );
  return user;
};
const getOrderInfoEveryUser = async (userId) => {
  const order_user = await Orders.find({ user_id: userId }).select("_id");
  return order_user.length;
};

const updateProfileId = async (userId) => {
  const random_number = HELPER.randomNumber();
  const user = await Users.findById(userId).select("+password");
  let redis_multi = REDIS.pipeline()
    .del(`userId:${userId}`)
    .set(
      `userId:${userId}`,
      JSON.stringify(user),
      CONTAINS._1_DAYS_REDIS + random_number
    );
  redis_multi.exec()
};

module.exports = {
  getProfileId,
  updateProfileId,
  getInfoEveryUser,
  getOrderInfoEveryUser,
};
