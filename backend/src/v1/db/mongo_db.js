require("dotenv").config({ path: __dirname + "../../../../../.env" });
const mongoose = require("mongoose");
const CONFIGS = require("../configs/config");
const connectDB = async () => {
  try {
    await mongoose.connect(CONFIGS.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    // console.log(error);
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};
module.exports = connectDB;
