const Users = require("../../models/userModel");
const UserVerifications = require("../../models/userVerificationModel");
const CONSTANTS = require("../../configs/constants");
module.exports = {
  /**
   * @author Tiến Tài
   * Delete Uncheck
   */
  async Delete_User_Un_Check_Expired() {
    const data = await UserVerifications.find({
      expiresAt: { $lt: Date.now() },
    }).select("userId");
    const users = await Users.find({
      verified: CONSTANTS.DELETED_DISABLE,
    }).select("_id");
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < users.length; j++) {
        if (data[i].userId == users[j].id) {
          await Users.deleteOne({ _id: users[j].id });
          await UserVerifications.deleteOne({ userId: data[i].userId });
        }
      }
    }
  },
};
