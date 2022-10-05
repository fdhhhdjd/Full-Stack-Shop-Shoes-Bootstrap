const fetch = require("node-fetch");
const { OAuth2Client } = require("google-auth-library");
const { createRefreshToken } = require("../utils/helper");
const { get, saveTokenRedis } = require("../utils/limited_redis");
const CONSTANTS = require("../configs/constants");
const CONFIGS = require("../configs/config");
const Users = require("../models/userModel");
const Category = require("../models/CategoryModel");
const Products = require("../models/ProductModel");
const Carousels = require("../models/CarouselModel");
const UserVerifications = require("../models/userVerificationModel");
const HELPER = require("../utils/helper");
const CLIENT_ID = CONFIGS.GOOGLE_CLIENT_IDS;
const client = new OAuth2Client(CLIENT_ID);
module.exports = {
  /**
   * * code Status
   */
  reasonPhraseCodeProNewMap: () => {
    const result = new Map([
      ["100", CONSTANTS.STATUS_CODE_100],
      ["101", CONSTANTS.STATUS_CODE_101],
      ["102", CONSTANTS.STATUS_CODE_102],
      ["103", CONSTANTS.STATUS_CODE_103],
      ["200", CONSTANTS.STATUS_CODE_200],
      ["201", CONSTANTS.STATUS_CODE_201],
      ["202", CONSTANTS.STATUS_CODE_202],
      ["203", CONSTANTS.STATUS_CODE_203],
      ["204", CONSTANTS.STATUS_CODE_204],
      ["302", CONSTANTS.STATUS_CODE_302],
      ["305", CONSTANTS.STATUS_CODE_305],
      ["306", CONSTANTS.STATUS_CODE_306],
      ["307", CONSTANTS.STATUS_CODE_307],
      ["308", CONSTANTS.STATUS_CODE_308],
      ["403", CONSTANTS.STATUS_CODE_403],
      ["404", CONSTANTS.STATUS_CODE_404],
      ["503", CONSTANTS.STATUS_CODE_503],
      ["default", CONSTANTS.STATUS_CODE_DEFAULT],
    ]);
    return result;
  },

  //* RecapCha
  async validateHuman(token) {
    const secret = CONFIGS.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: "POST",
      }
    );
    let data = await response.json();
    return data.success;
  },
  //* Users email
  async checkUserExit(email) {
    const user = await Users.findOne({
      email: email,
      // role: CONSTANTS.ACCOUNT_USER,
    });
    return user;
  },
  //* Users email admin
  async checkAdminExit(email) {
    const user = await Users.findOne({
      email: email,
      role: CONSTANTS.ACCOUNT_ADMIN,
    });
    return user;
  },
  //* async check User Exit Except User main
  async checkPhoneExitExceptUserMain(user_id, phone_number) {
    const user = await Users.find({
      _id: { $ne: user_id },
      phone_number: phone_number,
      role: CONSTANTS.ACCOUNT_USER,
    });
    return user;
  },
  //* Product check Exit

  async checkProductExit(name) {
    const user = await Products.find({
      name,
    });
    return user;
  },
  //* async check Product Exit Except Product main

  async checkProductExitExceptUserMain(product_id, name) {
    const user = await Products.find({
      _id: { $ne: product_id },
      name,
    });
    return user;
  },
  //* Carousel check Exit Except Product main
  async checkCarouselExitExceptUserMain(_id, heading) {
    const carousel = await Carousels.find({
      _id: { $ne: _id },
      heading,
    });
    return carousel;
  },
  //* Carousel check Exit
  async checkCarouselExit(heading) {
    const carousel = await Carousels.find({
      heading,
    });
    return carousel;
  },
  //* check phone exit
  async checkPhoneExit(phone_number) {
    const user = await Users.find({
      phone_number: phone_number,
    });
    return user;
  },
  //* Check exit category
  async checkCategoryExit(name) {
    return await Category.findOne({ name });
  },
  //* Check exit ExitExcept

  async checkCategoryExitExceptUserMain(category_id, name) {
    const categories = await Category.find({
      _id: { $ne: category_id },
      name,
    });
    return categories;
  },
  //* Check verification
  async checkVerification(userId) {
    const userVerification = await UserVerifications.findOne({ userId });
    return userVerification;
  },
  //*Take Data user Google
  async callDataGoogle(tokenId) {
    return await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });
  },
  //*Take Data user facebook
  callDataFacebook(userID, accessToken) {
    let urlGraphFacebook = HELPER.getURIFromTemplate(
      CONSTANTS.STORAGE_GRAPH_FACEBOOK,
      {
        userID,
        accessToken,
      }
    );
    return fetch(urlGraphFacebook, {
      method: "GET",
    }).then((response) => response.json());
  },
  //* check role user_id
  async checkRoleUserId({ user_id }) {
    await Users.findOne({
      _id: user_id,
      role: CONSTANTS.ACCOUNT_ADMIN,
    });
  },
  //* cookie
  saveCookies(res, refreshToken) {
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: CONFIGS.NODE_ENV === "PRODUCTION" ? true : false,
      sameSite: CONFIGS.NODE_ENV === "PRODUCTION" ? true : false,
      secure: CONFIGS.NODE_ENV === "PRODUCTION" ? true : false,
      path: "/api/auth/refresh_token",
      maxAge: CONSTANTS._7_DAY,
    });
  },
  //*Handle RefetchToken
  async GenerateRefreshToken(user) {
    const refresh = await get(user.id);
    if (refresh) {
      return refresh;
    }
    const refreshToken = createRefreshToken(user);
    await saveTokenRedis(user.id, refreshToken, CONSTANTS._7_DAYS_REDIS);
    return refreshToken;
  },
  //* Check user reset Expired
  async CheckUserExpired(resetPasswordToken) {
    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    return user;
  },
  //*Stock
  async stock(id, quantity, countInStock) {
    try {
      await Products.findOneAndUpdate(
        { _id: id },
        {
          countInStock: Number(countInStock) - Number(quantity),
        }
      );
    } catch (error) {
      console.error(
        "----------------------Stock--------error------------",
        error
      );
    }
  },
  //*Sold
  async sold(id, quantity, oldSold) {
    try {
      await Products.findOneAndUpdate(
        { _id: id },
        {
          sold: Number(quantity) + Number(oldSold),
        }
      );
    } catch (error) {
      console.error(
        "----------------------Sold--------error------------",
        error
      );
    }
  },
};
