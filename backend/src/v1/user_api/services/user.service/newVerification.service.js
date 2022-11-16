const UserVerifications = require("../../../models/userVerificationModel");
const CONSTANTS = require("../../../configs/constants");
module.exports = {
  Verification: async ({ newUser, hashedUniqueString }) => {
    const newVerification = new UserVerifications({
      userId: newUser.id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + CONSTANTS._45_MINUTES,
    });
    return newVerification.save();
  },
};
