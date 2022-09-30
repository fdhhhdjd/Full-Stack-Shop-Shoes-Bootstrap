"use strict";
const { _Otp } = require("../../../models/Otp.model");
const PASSWORD = require("../../../utils/password");
module.exports = {
  validOtp: async ({ otp, hashOtp }) => {
    const invalidOtp = await PASSWORD.comparePassword(otp, hashOtp);
    return invalidOtp;
  },
  insertOtp: async ({ otp, email }) => {
    const salt = await PASSWORD.genSalt();
    const hashOtp = await PASSWORD.encodeResetPassword(otp, salt);
    const Otp = await _Otp.create({
      email,
      otp: hashOtp,
    });
    return Otp ? `OTP sent to your ${email}` : 0;
  },
};
