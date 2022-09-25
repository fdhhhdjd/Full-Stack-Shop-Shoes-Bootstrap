const { Schema, model } = require("mongoose");
const otpSchema = new Schema(
  {
    email: String,
    otp: String,
    //! 20 seconds expire
    time: { type: Date, default: new Date(), index: { expires: 20 } },
  },
  {
    collection: "otp",
    timestamps: true,
  }
);

module.exports = {
  _Otp: model("otp", otpSchema),
};
