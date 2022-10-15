const { updateProfileId } = require("./getalluser.service");
const Users = require("../../../models/userModel");
const UserVerifications = require("../../../models/userVerificationModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");

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
//* Update Profile */
const UpdateProfile = async ({
  name,
  image,
  phone_number,
  sex,
  date_of_birth,
  user_id,
}) => {
  await Users.findOneAndUpdate(
    { _id: user_id },
    {
      name,
      image,
      phone_number,
      sex,
      date_of_birth,
    }
  );
  let userId = user_id;
  if (userId) {
    await updateProfileId(userId);
  }
  return true;
};
//** Delete User And Verification */
const deleteVerificationAndUser = async (userId) => {
  await UserVerifications.deleteOne({ userId });
  await Users.deleteOne({ _id: userId });
  return true;
};
//** Update Verification CheckEmail */
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
//** Create_acceptToken */
const NewAcceptToken = (user) => {
  return HELPER.createAccessToken(user);
};
//** Update Password */
const UpdatePassword = async ({ user_id, password }) => {
  console.log(user_id, password);
  return Users.findByIdAndUpdate(
    { _id: user_id },
    { password: password },
    { new: true }
  );
};
module.exports = {
  //* CreateUser
  createUser,
  //** Delete User And Verification */
  deleteVerificationAndUser,
  // ** Update User Check Verification
  UpdateVerificationUser,
  //** New access TokenId */
  NewAcceptToken,
  //* Update Password
  UpdatePassword,
  //* Update Profile
  UpdateProfile,
};
