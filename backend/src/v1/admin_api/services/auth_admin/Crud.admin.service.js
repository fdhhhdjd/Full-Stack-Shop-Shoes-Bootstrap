const Users = require("../../../models/userModel");
const UserVerifications = require("../../../models/userVerificationModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
const PASSWORD = require("../../../utils/password");
const { RedisPub } = require("../../../utils/limited_redis");
// ** Delete Verification
const deleteVerification = async (userId) => {
  await UserVerifications.deleteOne({ userId });
};
//** Create User */
const createAdmin = async (
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
    role: 1,
    sex,
    date_of_birth,
    phone_number,
  });
  return await newUser.save();
};
//** Create User Social*/
const createAdminSocial = async ({ name, email, picture, password }) => {
  const password_random = await PASSWORD.encodePassword(password);
  const newUser = new Users({
    name,
    email,
    password: password_random,
    role: 1,
    image: picture,
    verified: CONSTANTS.DELETED_ENABLE,
  });
  await RedisPub(
    "admin_register_password_google_facebook",
    JSON.stringify({
      password,
      name,
      email,
    })
  );
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
  await getProfileId(userId);
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
const UpdatePassword = async (user_id, password) => {
  return Users.findByIdAndUpdate(
    { _id: user_id },
    { password: password },
    { new: true }
  );
};
const getDetailUser = async (user_id) => {
  return await Users.findById(user_id);
};
module.exports = {
  //* Create Admin
  createAdmin,
  //* Create Admin Social
  createAdminSocial,
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
  //* Detail
  getDetailUser,
};
