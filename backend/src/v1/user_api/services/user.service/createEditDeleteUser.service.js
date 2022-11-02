const { updateProfileId } = require("./getalluser.service");
const Users = require("../../../models/userModel");
const UserVerifications = require("../../../models/userVerificationModel");
const CONSTANTS = require("../../../configs/constants");
const HELPER = require("../../../utils/helper");
const {
  destroyStorage,
} = require("../../../upload_cloudinary/services/uploadStorage.service");

// ** Delete Verification
const deleteVerification = async (userId) => {
  UserVerifications.deleteOne({ userId });
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
  return Promise.all([deleteImageAutoCloud(user_id), Users.findOneAndUpdate(
    { _id: user_id },
    {
      name,
      image,
      phone_number,
      sex,
      date_of_birth,
    }
  ),
  updateProfileId(user_id)
  ]).then(() => {
    return true;
  }).catch(err => {
    return false;
  })
};
//** Delete User And Verification */
const deleteVerificationAndUser = async (userId) => {
  return Promise.all([
    UserVerifications.deleteOne({ userId }), Users.deleteOne({ _id: userId })
  ]).then((rs) => {
    return true;
  }).catch(err => {
    return false;
  })
};
//** Update Verification CheckEmail */
const UpdateVerificationUser = async (userId) => {

  return Promise.all([
    Users.findOneAndUpdate(
      { _id: userId },
      {
        verified: CONSTANTS.DELETED_ENABLE,
        checkLogin: CONSTANTS.DELETED_ENABLE,
      }
    ), deleteVerification(userId)
  ]).then((rs) => {
    return true;
  }).catch(err => {
    return false;
  })
  return true;
};
//** Create_acceptToken */
const NewAcceptToken = (user) => {
  return HELPER.createAccessToken(user);
};
//** Update Password */
const UpdatePassword = async ({ user_id, password }) => {
  return Users.findByIdAndUpdate(
    { _id: user_id },
    { password: password },
    { new: true }
  );
};
//** Delete Image Cloud auto */
const deleteImageAutoCloud = async (user_id) => {
  const user = await Users.findById(user_id);
  let public_id = user?.image?.public_id
  return destroyStorage(public_id);
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
