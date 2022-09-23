const fetch = require("node-fetch");
const CONSTANTS = require("../configs/constants");
const CONFIGS = require("../configs/config");
const Users = require("../models/userModel");
const UserVerifications = require("../models/userVerificationModel");
const HELPER = require("../utils/helper");
const { OAuth2Client } = require("google-auth-library");
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
      role: CONSTANTS.ACCOUNT_USER,
    });
    return user;
  },
  //* Users email
  async checkPhoneExit(phone_number) {
    const user = await Users.findOne({
      phone_number: phone_number,
      role: CONSTANTS.ACCOUNT_USER,
    });
    return user;
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

  //* cookie
  saveCookies(res, refreshToken) {
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: process.env.NODE_ENV === "PRODUCTION" ? true : false,
      sameSite: process.env.NODE_ENV === "PRODUCTION" ? true : false,
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
      path: "/api/auth/refresh_token",
      maxAge: CONSTANTS._7_DAY,
    });
  },
};
