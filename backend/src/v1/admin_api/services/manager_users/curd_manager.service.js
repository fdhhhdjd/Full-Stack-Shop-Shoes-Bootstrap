const { del } = require("../../../utils/limited_redis");
const CONSTANTS = require("../../../configs/constants");
const Users = require("../../../models/userModel");
const getAllUser = async () => {
  return await Users.find({
    role: 0,
    verified: CONSTANTS.DELETED_ENABLE,
  }).sort({ createdAt: -1 });
};
const getAllAdmin = async () => {
  return await Users.find({
    role: 1,
    verified: CONSTANTS.DELETED_ENABLE,
  }).sort({ createdAt: -1 });
};
const getAllUserDelete = async () => {
  Users.find({
    verified: CONSTANTS.DELETED_DISABLE,
    role: 0,
  })
    .select("-password")
    .sort({ createdAt: -1 });
};
const uploadAccount = async (
  name,
  image,
  phone_number,
  role,
  sex,
  date_of_birth,
  user_id
) => {
  await Users.findOneAndUpdate(
    { _id: user_id },
    {
      name,
      image,
      phone_number,
      role,
      sex,
      date_of_birth,
    }
  );
  return {
    success: true,
  };
};
const getAllUserSort = async (year_now, monthly) => {
  return await Users.aggregate([
    {
      //giong select
      $project: {
        month: { $month: "$updatedAt" },
        year: { $year: "$updatedAt" },
        role: 1,
        verified: 1,
      },
    },
    {
      //kiểm tra
      $match: {
        month: { $in: monthly },
        year: year_now,
        role: 0,
        verified: true,
      },
    },
    {
      //khai báo nhận giá trị tự đặt
      $group: {
        _id: "$month",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};
const deleteAccount = async (user_id) => {
  await Users.findByIdAndDelete(user_id);
  await del(`userId:${user_id}`);
  await del(`cartUserId:${user_id}`);
};
const GetDayNewUser = (d1, d2) => {
  let value1 = d1.getTime();
  let value2 = d2.getTime();
  return Math.ceil((value2 - value1) / CONSTANTS._1_DAY);
};

module.exports = {
  getAllUser,
  getAllAdmin,
  uploadAccount,
  deleteAccount,
  GetDayNewUser,
  getAllUserDelete,
  getAllUserSort,
};
