const Users = require("../../../models/userModel");
const UserVerifications = require("../../../models/userVerificationModel");
const CONSTANTS = require("../../../configs/constants");
// ** Delete Verification
const deleteVerification = async (userId) => {
  await UserVerifications.deleteOne({ userId });
};
//** Create User */
const createUser = async (
  name,
  email,
  password,
  sex,
  date_of_birth,
  phone_number
) => {
  const newUser = new Users({
    name,
    email,
    password,
    sex,
    date_of_birth,
    phone_number,
  });
  return await newUser.save();
};
//** Delete User And Verification */
const deleteVerificationAndUser = async (userId) => {
  await UserVerifications.deleteOne({ userId });
  await Users.deleteOne({ _id: userId });
  return true;
};
const UpdateVerificationUser = async (userId) => {
  await Users.findOneAndUpdate(
    { _id: userId },
    {
      verified: CONSTANTS.DELETED_ENABLE,
      checkLogin: CONSTANTS.DELETED_ENABLE,
    }
  );
  await deleteVerification(userId);
  return true;
};
module.exports = {
  //* CreateUser
  createUser,
  //** Delete User And Verification */
  deleteVerificationAndUser,
  // ** Update User Check Verification
  UpdateVerificationUser,
};
