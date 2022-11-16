const { Schema, model } = require("mongoose");
const CONSTANTS = require("../configs/constants");
const otpSchema = new Schema(
  {
    email: String,
    otp: String,
    //! 20 seconds expire
    time: {
      type: Date,
      default: new Date(),
      index: { expires: CONSTANTS._15_MINUTES },
    },
  },
  {
    collection: "otp",
    timestamps: true,
  }
);

module.exports = {
  _Otp: model("otp", otpSchema),
};
